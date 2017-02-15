// create promise option
// bluebird has many features and faster than ES6 Promises
var promise = require('bluebird');

var options = {
    // initialize pg-promise option
    promiseLib: promise
}

// set up and connect to database
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/actokids';
var db = pgp(connectionString);

module.exports = {
  getAllActivities: getAllActivities,
  createNewActivity: createNewActivity
  // add more functions here
};

const settings = {
    activity_test_database : 'activity_test',
    activity_prod_database : 'activity_prod'    
}

// gets all activities
function getAllActivities(req, res, next) {
  db.any('select * from ' + settings.activity_test_database)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Getting all activities.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// create a new activity
function createNewActivity(req, res, next) {
  req.body.date = parseDate(req.body.date);
  db.none('insert into '+ settings.activity_test_database
   + '(activity_name, date, time_of_day, cost, street_name, city, state, country, zip_code'
   + ', descriptions, wheelchair_accessible, activity_type, disability_type, age_rage'
   + ', parent_participation_required, assistant_provided, disability_restrooms_available'
   + ', equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available'
   + ', closed_circuit_heering_loop_available, additional_charge, accomodate_sevice_animals'
   + ', onside_childcare'
   + ' values(${activity_name}, ${date}, ${time_of_day}, ${cost}, ${street_name}, ${city}, ${state}'
   + ', ${country}, ${zip_code}, ${descriptions}, ${wheelchair_accessible}, ${activity_type}'
   + ', ${disability_type}, ${age_rage}, ${parent_participation_required}, ${assistant_provided}'
   + ', ${disability_restrooms_available}, ${equipment_provided}, ${sibling_participation}'
   + ', ${kids_to_staff_ratio}, ${asl_interpreter_available}, ${closed_circuit_heering_loop_available}'
   + ', ${additional_charge}, ${accomodate_sevice_animals}, ${onside_childcare})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserting a new activity.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}