const Food = require("../models/food.model.js");
const FoodLog = require("../models/foodLog.model.js");

async function getFoods(req, res) {
  try {
    const foods = await Food.find();

    res.status(200).json(foods);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ err: "Internal Server Error. Could not Fetch Data" });
  }
}
//-------- --------//

//-------- --------//

async function createFood(req, res) {
  const body = req.body;

  try {
    const food = await Food.create({
      name: body.name.toLowerCase(),
      calories: body.calories,
      grams: body.grams,
      protein: body.protein,
      fats: body.fats,
      carbs: body.carbs,
    });
    res.status(201).json(food);
  } catch (err) {
    console.log(err.message);
    res.status(409).json({ error: "Server error, could not create food item" });
  }
}
//-------- --------//

async function updateFood(req, res) {
  const foodId = req.params.id;
  const body = req.body;

  try {
    const query = await Food.findByIdAndUpdate(foodId, body);

    res.status(200).json(query);
  } catch (err) {
    res.send(err);
  }
}

// returns all the foods of the current date that user has logged
async function getUserFoods(req, res) {
  // userId is passed from authMiddleware
  const userId = req.userId;

  const currentDate = new Date().toISOString().split("T")[0];
  //console.log(currentDate);

  try {
    const logs = await FoodLog.findOne(
      {
        userId: userId,
        "logs.date": currentDate,
      },
      { "logs.$": 1 }
    );

    console.log(logs);
    if (logs) {
      res.status(200).json(logs.logs[0].foods);
    } else {
      throw new Error("Couldn't fetch user logs...");
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "ERROR 404! Couldn't find logs for today..." });
  }
}
//-------- --------//

// Logs a food to the foodLogs collection
/* example object to send:
{
    "userId": "68acf1550cd4b22e28dfe3ff",
	  "name": "asdasad",
    "grams": 213,
    "calories": 222,
    "protein": 11,
    "carbs": 5,
    "fats": 7,
    "mealType": "BreakFast"
}
*/
async function logUserFood(req, res) {
  data = req.body;
  const userId = req.userId;

  const currentDate = new Date().toISOString().split("T")[0];

  let newObject = null;
  // Try to add the food to an EXISTING LOG with the current date
  try {
    newObject = await FoodLog.findOneAndUpdate(
      { userId: userId, "logs.date": currentDate },
      {
        $push: {
          "logs.$.foods": {
            name: data.name,
            grams: data.grams,
            calories: data.calories,
            protein: data.protein,
            carbs: data.carbs,
            fats: data.fats,
            mealType: data.mealType,
          },
        },
      },
      { new: true }
    );

    if (newObject) {
      //console.log("eeddwwww: ", newObject.logs.at(-1).foods.at(-1));
      res.status(200).json({ message: newObject.logs.at(-1).foods.at(-1) });
    }
    // If a log with current date DOESNT EXIST create a new one (append in the logs array)
    else {
      newObject = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: currentDate,
              foods: [
                {
                  name: data.name,
                  grams: data.grams,
                  calories: data.calories,
                  protein: data.protein,
                  carbs: data.carbs,
                  fats: data.fats,
                  mealType: data.mealType,
                },
              ],
            },
          },
        },
        { new: true }
      );

      //console.log(newObject);

      if (newObject) {
        res.status(201).json({ message: newObject });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error 500\nFailed to Log food..." });
  }
}
//-------- --------//

/* 
if it returns status == 200 delete successful
else if status == 500 then delete failed
*/
async function deleteUserLogsFood(req, res) {
  const foodId = req.params.id;
  const userId = req.userId;
  //console.log("DELETE FOOD: " + foodId);
  const currentDate = new Date().toISOString().split("T")[0];
  //console.log(currentDate);

  try {
    // Find the document with the userId and log with currentDate
    // and pull the object with _id == foodId from the foods array
    const query = await FoodLog.updateOne(
      { userId: userId, "logs.date": currentDate },
      { $pull: { "logs.$.foods": { _id: foodId } } }
    );

    console.log("-------", query, "-------");

    if (query.acknowledged === true) {
      res
        .status(200)
        .json({ message: `Successful Delete on food._id:${foodId}` });
    } else {
      throw new Error(`ERROR!\nDelete operation on food._id:${foodId} FAILED!`);
    }
  } catch (err) {
    console.log("Delete Failed");
    res.status(500).json({ message: err });
  }
}

// This was used to test how the query works
async function getUserLogsFood(req, res) {
  const foodId = req.params.id;
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const query = await FoodLog.find({
      userId: userId,
      "logs.date": currentDate,
      "logs.foods._id": foodId,
    });

    res.json({ message: query });
  } catch (err) {
    res.status(404).json({ message: "asdasd" });
  }
}
//-------- --------//
module.exports = {
  getFoods,
  createFood,
  deleteUserLogsFood,
  getUserLogsFood,
  updateFood,
  logUserFood,
  getUserFoods,
};
