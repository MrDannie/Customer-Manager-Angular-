const express = require('express');
const router = express.Router();
const statesController = require('../controller/states')


router.get('/', statesController.getStates)

module.exports = router