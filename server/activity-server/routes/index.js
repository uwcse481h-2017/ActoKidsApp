var express = require('express');
var router = express.Router();

var db = require('../queries');

// add more api calls here
router.get('/api/activities/getAllActivities', db.getAllActivities);
router.post('/api/activities/createNewActivity', db.createNewActivity);
router.post('/api/activities/findFilteredActivities', db.findFilteredActivities);

module.exports = router;
