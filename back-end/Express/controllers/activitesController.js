const FoodLog = require("../models/foodLog.model");
const { findOneAndUpdate } = require("../models/food.model");

async function getTodayUserActivities(req, res) {
  const date = req.params.date;
  const userId = req.userId;

  //TODO: need to implement an errorHandler MiddleWare to handle errors on all the controllers
  try {
    const data = await FoodLog.findOne(
      { userId: userId, "logs.date": date },
      { "logs.$": 1 },
    );
    // if userId and date are found in the document
    if (data) {
      // return the whole activities array as a response
      res.status(200).json({ data: data.logs[0].activities });
    }
    // Didnt find userId or Log with this date
    else {
      res.json({ data: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message });
  }
}

async function postTodayUserActivity(req, res) {
  const date = req.params.date;
  const userId = req.userId;
  const body = req.body;

  // try to append activity object in an existing Log
  try {
    let data = await FoodLog.findOneAndUpdate(
      { userId: userId, "logs.date": date },
      {
        $push: {
          "logs.$.activities": {
            activityType: body.activityType,
            duration: body.duration,
            calories: body.calories,
          },
        },
      },
      { new: true },
    );

    // if append was successful return
    if (data) {
      // return res
      //   .status(200)
      //   .json({ success: true, data: data.logs.at(-1).activities });
    }
    // If there are no logs for the requested date
    if (!data) {
      data = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: date,
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
        { new: true },
      );

      // if Log creation and activity insertion was successful return
      if (!data) {
        throw new Error("Couldnt create log");
      }
    }

    const dateIndex = data.logs.findIndex((obj) => obj.date === date);
    return res
      .status(200)
      .json({ success: true, data: data.logs[dateIndex].activities });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false });
  }
}

module.exports = { getTodayUserActivities, postTodayUserActivity };
