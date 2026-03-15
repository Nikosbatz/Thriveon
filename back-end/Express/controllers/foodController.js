const Food = require("../models/food.model.js");
const BarcodeFood = require("../models/barcodeFood.model.js");
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

// returns all the foods of the current date that user has logged and the food history
async function getUserFoods(req, res) {
  const userId = req.userId;

  const currentDate = new Date().toISOString().split("T")[0];
  console.log(currentDate);

  try {
    const logs = await FoodLog.findOne(
      {
        userId: userId,
        "logs.date": currentDate,
      },
      { "logs.$": 1, foodHistory: 1 },
    );

    if (logs) {
      res
        .status(200)
        .json({ data: logs.logs[0].foods, foodHistory: logs.foodHistory });
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

// TODO: When deleting food from the foodLogs also delete if from foodHistory (Maybe use the _id of the logs.food _id in the
//  foodHistory object to map the correct object on the foodHistory on delete)

async function logUserFood(req, res) {
  const data = req.body;
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];

  let logs = null;
  try {
    // Query to get foodHistory
    const queryResult = await FoodLog.findOne(
      {
        userId: userId,
      },
      { foodHistory: 1 },
    );

    // Dont allow duplicates in foodhistory
    // Duplicate is defined as same name and same quantity
    foodExistsInHistory = queryResult.foodHistory.find(
      (food) => food.name === data.name && food.quantity === data.quantity,
    );

    // Define an object representing the query regarding foodHistory
    // if food exists in foodHistory object remains empty and query does nothing
    const foodHistoryInsertQuery = {};
    if (!foodExistsInHistory) {
      foodHistoryInsertQuery.foodHistory = { $each: [data], $position: 0 };
    }

    logs = await FoodLog.findOneAndUpdate(
      { userId: userId, "logs.date": currentDate },
      {
        $push: {
          "logs.$.foods": {
            ...data,
          },
          ...foodHistoryInsertQuery,
        },
      },
      { new: true },
    );

    if (logs) {
      res.status(200).json({
        message: logs.logs.at(-1).foods,
        foodHistory: logs.foodHistory,
      });
    }
    // If a log with current date DOESNT EXIST create a new one (append in the logs array)
    else {
      logs = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: currentDate,
              foods: [
                {
                  ...data,
                },
              ],
            },
            // Push at the start of the array the new object
            foodHistory: {
              $each: [data],
              $position: 0,
            },
          },
        },
        { new: true },
      );

      if (logs) {
        res.status(201).json({
          message: logs.logs.at(-1).foods,
          foodHistory: logs.foodHistory,
        });
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

async function deleteUserLogsFood(req, res) {
  const foodId = req.params.id;
  const userId = req.userId;
  console.log(foodId);
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    // Find the document with the userId and log with currentDate
    // and pull the object with _id == foodId from the foods array
    const query = await FoodLog.updateOne(
      { userId: userId, "logs.date": currentDate },
      { $pull: { "logs.$.foods": { _id: foodId } } },
    );

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

async function getBarcodeFood(req, res) {
  const code = req.params.id;
  console.log(code);
  try {
    const query = await BarcodeFood.find({
      code: code,
    });
    console.log(query);
    res.status(200).json(query[0]);
  } catch (err) {
    res.status(404).json({ message: "Could not find requested food" });
  }
}

async function getSearchFoods(req, res) {
  const searchInput = req.params.id;

  console.log(searchInput);

  if (typeof searchInput !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const searchResult = await BarcodeFood.find(
      { $text: { $search: searchInput } },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(30);
    res.status(200).json({ data: searchResult });
  } catch (error) {
    res.status(500).send();
  }
}

//-------- --------//
module.exports = {
  getFoods,
  createFood,
  deleteUserLogsFood,
  updateFood,
  logUserFood,
  getUserFoods,
  getBarcodeFood,
  getSearchFoods,
};
