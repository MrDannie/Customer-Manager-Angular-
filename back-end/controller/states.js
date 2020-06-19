const State = require("../models/states");

//Get List of States

exports.getStates = (req, res) => {
  State.find()
    .then(states => {
      res.status(200).json({
        states: states
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};
