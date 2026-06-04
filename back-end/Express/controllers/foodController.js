const Food = require("../models/food.model.js");
const BarcodeFood = require("../models/barcodeFood.model.js");
const FoodLog = require("../models/foodLog.model.js");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

async function getFoods(req, res) {
  try {
    const foods = await Food.find();

    res.status(200).json(foods);
  } catch (err) {
    res
      .status(500)
      .json({ err: "Internal Server Error. Could not Fetch Data" });
  }
}

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
    res.status(409).json({ error: "Server error, could not create food item" });
  }
}

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

// returns all the foods of the date from params.id that user has logged and the food history
async function getUserFoods(req, res) {
  let date = req.params.id;
  const userId = req.userId;

  try {
    let logs = await FoodLog.findOne(
      {
        userId: userId,
        "logs.date": date,
      },
      { "logs.$": 1, foodHistory: 1, myFoods: 1 },
    );
    if (logs) {
      res.status(200).json({
        data: logs.logs[0].foods,
        foodHistory: logs.foodHistory,
        myFoods: logs.myFoods,
      });
    } else {
      logs = await FoodLog.find(
        { userId: userId },
        { foodHistory: 1, myFoods: 1 },
      );

      res.status(200).json({
        foodHistory: logs[0].foodHistory,
        myFoods: logs[0].myFoods,
        data: [],
      });
    }
  } catch (err) {
    res
      .status(404)
      .json({ message: "ERROR 404! Couldn't find logs for today..." });
  }
}

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
  const date = req.params.date;
  const data = req.body;
  const userId = req.userId;

  if (data.loggedQuantity <= 0) {
    return res.status(400).send();
  }

  console.log(data);
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
    const foodExistsInHistory = queryResult.foodHistory.find(
      (food) =>
        food.name === data.name && food.loggedQuantity === data.loggedQuantity,
    );

    // Define an object representing the query regarding foodHistory
    // if food exists in foodHistory, object remains empty and query does nothing
    const foodHistoryInsertQuery = {};
    if (!foodExistsInHistory) {
      foodHistoryInsertQuery.foodHistory = {
        $each: [data],
        $position: 0,
        $slice: 20, // Keep only the 20 most recent entries in foodHistory
      };
    }

    logs = await FoodLog.findOneAndUpdate(
      { userId: userId, "logs.date": date },
      {
        $push: {
          "logs.$.foods": {
            ...data,
          },
          ...foodHistoryInsertQuery,
        },
      },
      {
        new: true,
        // return only the logs of the requested date
        projection: {
          logs: { $elemMatch: { date: date } },
          foodHistory: 1,
        },
      },
    );

    if (logs) {
      res.status(200).json({
        message: logs.logs.at(0).foods,
        foodHistory: logs.foodHistory,
      });
    }
    // If a log with this date DOESNT EXIST create a new one (append in the logs array)
    else {
      logs = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: date,
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
        {
          new: true,
          // return only the logs of the requested date
          projection: {
            logs: { $elemMatch: { date: date } },
            foodHistory: 1,
          },
        },
      );

      if (logs) {
        res.status(201).json({
          message: logs.logs.at(0).foods,
          foodHistory: logs.foodHistory,
        });
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Error 500\nFailed to Log food..." });
  }
}

async function createRecipe(req, res) {
  const userId = req.userId;
  const recipe = req.body;

  try {
    const updatedLog = await FoodLog.findOneAndUpdate(
      { userId: userId },
      {
        $push: { myFoods: recipe }, // Push item or create array if it doesn't exist.
      },
      {
        new: true, // Return the modified document instead of the original
        runValidators: true,
      },
    );

    res.status(201).json({ myFoods: updatedLog.myFoods });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }

  return res.status(200).send();
}

async function deleteRecipe(req, res) {
  const userId = req.userId;
  const recipeId = req.params.recipeId;

  try {
    const logs = await FoodLog.findOneAndUpdate(
      { userId: userId },
      { $pull: { myFoods: { _id: recipeId } } },
      { new: true },
    );

    if (logs) {
      res.status(200).json({ myFoods: logs.myFoods });
    } else {
      throw new Error(
        `ERROR!\nDelete operation on food._id:${recipeId} FAILED!`,
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
}

async function deleteUserLogsFood(req, res) {
  const foodId = req.params.foodId;
  const date = req.params.date;
  const userId = req.userId;

  try {
    // Find the document with the userId and log with the date requested
    // and pull the object with _id == foodId from the foods array
    const query = await FoodLog.updateOne(
      { userId: userId, "logs.date": date },
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
    res.status(500).json({ message: err });
  }
}

async function getBarcodeFood(req, res) {
  const code = req.params.id;
  try {
    const query = await BarcodeFood.find({
      code: code,
    });
    if (query.length !== 0) {
      return res.status(200).json(query[0]);
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(404).json({ message: "Could not find requested food" });
  }
}

async function getSearchFoods(req, res) {
  const searchInput = req.params.id;

  if (typeof searchInput !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const [usdaSearchResult, barcodeSearchResult] = await Promise.all([
      // 1. USDA FOODS SEARCH
      Food.aggregate([
        {
          $search: {
            index: "default", // Matches the index name in Atlas
            text: {
              query: searchInput,
              path: ["name", "brands"], // Fields to search
              fuzzy: { maxEdits: 1 }, // Typo tolerance! (e.g., "bananna" -> "banana")
            },
          },
        },
        { $limit: 150 },
        {
          $set: {
            score: { $meta: "searchScore" },
            adjustedScore: {
              $cond: {
                if: { $eq: ["$starred", true] },
                then: { $add: [{ $meta: "searchScore" }, 2.5] },
                else: { $add: [{ $meta: "searchScore" }, 1] },
              },
            },
          },
        },
      ]),

      // 2. BARCODE FOODS SEARCH (2M Records)
      BarcodeFood.aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: searchInput,
              path: ["name", "brands"],
              fuzzy: { maxEdits: 1 },
            },
          },
        },
        { $limit: 30 },
        {
          $set: {
            score: { $meta: "searchScore" },
            adjustedScore: {
              $cond: {
                if: { $eq: ["$starred", true] },
                then: { $add: [{ $meta: "searchScore" }, 0] },
                else: { $add: [{ $meta: "searchScore" }, -3] },
              },
            },
          },
        },
      ]),
    ]);

    const searchResult = [...usdaSearchResult, ...barcodeSearchResult];
    searchResult.sort((a, b) => b.adjustedScore - a.adjustedScore);

    res.status(200).json(searchResult);
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
  createRecipe,
  deleteRecipe,
};
