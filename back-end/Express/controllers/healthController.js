const FoodLog = require("../models/foodLog.model.js");
const User = require("../models/user.model.js");

async function getUserWaterLog(req, res) {
  const date = req.params.date;
  const userId = req.userId;

  try {
    const logs = await FoodLog.findOne(
      {
        userId: userId,
        "logs.date": date,
      },
      { "logs.$": 1 },
    );

    // if a water logs exists then return the amount
    if (logs) {
      return res.json({
        water: logs.logs[0].water === null ? 0 : logs.logs[0].water,
      });
    }
    // else send "Error 404"
    else {
      res.status(200).json({ water: 0 });
    }
  } catch (err) {
    /*if logs for userId and currentDate doesnt exist then throw "Error 404"*/
    res.status(404).send();
  }
}

async function postUserWaterLog(req, res) {
  const date = req.params.date;
  const userId = req.userId;
  const water = req.body.water;

  try {
    let logs = await FoodLog.findOneAndUpdate(
      {
        userId: userId,
        "logs.date": date,
      },
      { $set: { "logs.$.water": water } },
      { new: true },
    );
    // if a log for the current date and userId exists and the $set is successful
    if (logs) {
      return res.status(200).send();
    }
    // if a log for the current date doesnt exist create a new one and $set the water field
    else {
      logs = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: date,
              water: water,
            },
          },
        },
      );
    }
    // if a new object is created in logs array and the water field is $set successfully
    if (logs) {
      return res.status(201).send();
    }
    // if query failed then userId doenst exist
    else {
      return res.status(404).json({ message: "userId doenst exist" });
    }
  } catch (error) {
    res.json({ message: "error" });
  }
}

// returns 7-day weight logs
async function getUserWeightLogs(req, res) {
  const date = req.params.date;
  const userId = req.userId;

  try {
    const logs = await FoodLog.findOne({
      userId: userId,
    });

    // if userId exists and user has a Logs array
    if (logs.logs) {
      const weightLogs = logs.logs.map((log) => {
        return { date: log.date, weight: log.weight ? log.weight : null };
      });

      weightLogs.sort((a, b) => a.date.localeCompare(b.date));
      requestedDateLogIndex = weightLogs.findIndex((obj) => obj.date === date);

      const finalWeightLogs =
        requestedDateLogIndex === -1
          ? weightLogs.slice(-7)
          : weightLogs.slice(0, requestedDateLogIndex + 1).slice(-7);
      res.status(200).json({ data: finalWeightLogs });
    }
  } catch (err) {
    /*if userId or Logs array doesnt exist then throw "Error 404"*/
    res.status(404).send();
  }
}

/* 
Updates the weight in the FoodLog and User documents
 */
async function postUserWeightLog(req, res) {
  const date = req.params.date;
  const userId = req.userId;
  const body = req.body;
  const weight = body.weight;

  try {
    // Update the FoodLog Document
    let logs = await FoodLog.findOneAndUpdate(
      {
        userId: userId,
        "logs.date": date,
      },
      { $set: { "logs.$.weight": weight } },
      { new: true },
    );

    console.log("weight: ", weight);
    // Update the User Document
    const userDocWeight = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { $set: { weight: weight } },
      { new: true },
    );

    // If user doesnt exist throw error
    if (!userDocWeight) {
      throw new Error();
    }

    // if a log for the requested date doesnt exist create a new one and $set the weight field
    if (!logs) {
      logs = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: date,
              weight: weight,
            },
          },
        },
        { new: true },
      );
    }
    // if a new object is created in logs array and the weight field is $set successfully
    if (logs) {
      const weightLogs = logs.logs.map((log) => {
        return { date: log.date, weight: log.weight ? log.weight : null };
      });

      weightLogs.sort((a, b) => a.date.localeCompare(b.date));
      requestedDateLogIndex = weightLogs.findIndex((obj) => obj.date === date);

      const finalWeightLogs =
        requestedDateLogIndex === -1
          ? weightLogs.slice(-7)
          : weightLogs.slice(0, requestedDateLogIndex + 1).slice(-7);
      res.status(200).json({ data: finalWeightLogs });
    }
    // if query failed then userId doenst exist
    else {
      throw new Error();
    }
  } catch (error) {
    return res.status(404).json({ message: "userId doenst exist" });
  }
}

module.exports = {
  getUserWaterLog,
  postUserWaterLog,
  getUserWeightLogs,
  postUserWeightLog,
};
