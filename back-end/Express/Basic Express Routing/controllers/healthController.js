const FoodLog = require("../models/foodLog.model.js");

async function getUserWaterLog(req, res) {
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const logs = await FoodLog.findOne(
      {
        userId: userId,
        "logs.date": currentDate,
      },
      { "logs.$": 1 }
    );

    // if a water logs exists then return the amount
    if (logs) {
      //console.log(logs);
      return res.json({ water: logs.logs[0].water });
    }
    // else send "Error 404"
    else {
      res.status(404).send();
    }
  } catch (err) {
    /*if logs for userId and currentDate doesnt exist then throw "Error 404"*/
    res.status(404).send();
  }
}

async function postUserWaterLog(req, res) {
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];
  const water = req.body.water;

  try {
    let logs = await FoodLog.findOneAndUpdate(
      {
        userId: userId,
        "logs.date": currentDate,
      },
      { $set: { "logs.$.water": water } },
      { new: true }
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
              date: currentDate,
              water: water,
            },
          },
        }
      );
    }
    // if a new object is created in logs array and the water field is $set successfully
    if (logs) {
      return res.status(201).send();
    }
    // if query failed then userId doenst exist
    else {
      console.log("404");
      return res.status(404).json({ message: "userId doenst exist" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "error" });
  }
}

// returns 7-day weight logs
async function getUserWeightLogs(req, res) {
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const logs = await FoodLog.findOne({
      userId: userId,
    });

    // if userId exists and user has a Logs array
    if (logs.logs) {
      const weightLogs = logs.logs
        .map((log) => {
          return { date: log.date, weight: log.weight ? log.weight : null };
        })
        .slice(-7);
      //console.log(weightLogs);
      res.status(200).json({ data: weightLogs });
    }
  } catch (err) {
    /*if userId or Logs array doesnt exist then throw "Error 404"*/
    res.status(404).send();
  }
}

async function postUserWeightLog(req, res) {
  const userId = req.userId;
  const currentDate = new Date().toISOString().split("T")[0];
  const body = req.body;
  const weight = body.weight;

  try {
    let logs = await FoodLog.findOneAndUpdate(
      {
        userId: userId,
        "logs.date": currentDate,
      },
      { $set: { "logs.$.weight": weight } },
      { new: true }
    );
    // if a log for the current date and userId exists and the $set is successful
    if (logs) {
      return res.status(200).send();
    }
    // if a log for the current date doesnt exist create a new one and $set the weight field
    else {
      logs = await FoodLog.findOneAndUpdate(
        { userId: userId },
        {
          $push: {
            logs: {
              date: currentDate,
              weight: weight,
            },
          },
        }
      );
    }
    // if a new object is created in logs array and the weight field is $set successfully
    if (logs) {
      return res.status(201).send();
    }
    // if query failed then userId doenst exist
    else {
      return res.status(404).json({ message: "userId doenst exist" });
    }
  } catch (error) {
    console.log("error");
    res.json({ message: "error" });
  }
}

module.exports = {
  getUserWaterLog,
  postUserWaterLog,
  getUserWeightLogs,
  postUserWeightLog,
};
