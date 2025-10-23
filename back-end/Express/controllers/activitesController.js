const FoodLog = require("../models/foodLog.model");
const { findOneAndUpdate } = require("../models/food.model");

async function getTodayUserActivities(req, res) {
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];

  //TODO: need to implement an errorHandler MiddleWare to handle errors on all the controllers
  try {
    const data = await FoodLog.findOne(
      { userId: userId, "logs.date": currentDate },
      { "logs.$": 1 }
    );
    // if userId and date are found in the document
    if (data) {
      // return the whole activities array as a response
      res.status(200).json({ data: data.logs[0].activities });
    }
    // Didnt find userId or Log with currentDate
    else {
      res.json({ data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message });
  }
}

async function postTodayUserActivity(req, res) {
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];
  const body = req.body;

  console.log(body);

  // try to append activity object in an existing Log
  try {
    let data = await FoodLog.findOneAndUpdate(
      { userId: userId, "logs.date": currentDate },
      {
        $push: {
          "logs.$.activities": {
            activityType: body.activityType,
            duration: body.duration,
            calories: body.calories,
          },
        },
      },
      { new: true }
    );

    // if append was successful return
    if (data) {
      res.status(200).json({ success: true });
    }
    // else create new Log for currentDate and insert activity object
    else {
      data = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: currentDate,
              activities: [
                {
                  activityType: body.activityType,
                  duration: body.duration,
                  calories: body.calories,
                },
              ],
            },
          },
        },
        { new: true }
      );

      // if Log creation and activity insertion was successful return
      if (data) {
        res.status(201).json({ success: true });
      } else {
        throw new Error("Couldnt create log");
      }
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false });
  }
}

module.exports = { getTodayUserActivities, postTodayUserActivity };
