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

// (${activity_name} comes as string
// ${date} comes as string representation of data. e.g '2017-02-15':
// ${time_of_day} comes as string representation of time_of_day. e.g '(11.0, 15.25)' meaing from 11:00am  until 3:15pm
// ${cost} comes as string representation of cost. e.g 16.35 meaing 16 dollars and 35 cents
// ${street_name} comes as string
// ${city} comes as string
// ${state} comes as string
// ${country} comes as string
// ${zip_code} comes as string
// ${descriptions} comes as string
// ${wheelchair_accessible} coms as string. Either 'true' or 'false'
// ${activity_type} comes as string. Must be one of activity_options enum
// ${disability_type} comes as string. Must be one of disability_options enum
// ${age_range} comes as string representation of age_range. e.g (5, 10) meaing age from 6 to 9. () exclusive [] inclusive
// ${parent_participation_required} coms as string. Either 'true' or 'false'
// ${assistant_provided}' coms as string. Either 'true' or 'false'
// ${disability_restrooms_available} coms as string. Either 'true' or 'false'
// ${equipment_provided} comes as string. e.g "['a','b','c']"
// ${sibling_participation}' coms as string. Either 'true' or 'false'
// ${kids_to_staff_ratio} comes as string.
// ${asl_interpreter_available} coms as string. Either 'true' or 'false'
// ${closed_circuit_heering_loop_available} coms as string. Either 'true' or 'false'
// ${additional_charge} coms as string. Either 'true' or 'false'
// ${accomodate_service_animals} coms as string. Either 'true' or 'false'
// ${onsite_childcare} coms as string. Either 'true' or 'false'
//
// create a new activity
function createNewActivity(req, res, next) {
  db.none('INSERT INTO '+ settings.activity_test_database
  + '(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code,'
  + 'descriptions, wheelchair_accessible, activity_type, disability_type, age_range,'
  + 'parent_participation_required, assistant_provided, disability_restrooms_available,'
  + 'equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,'
  + 'closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,'
  + 'onsite_childcare)'
  + ' values(${activity_name}, ${dates}::date, numrange(${time_of_day}), money(${cost}), ${street_name}, ${city}, ${state}'
  + ', ${country}, ${zip_code}::integer, ${descriptions}, ${wheelchair_accessible}::bool, ${activity_type}::activity_options'
  + ', ${disability_type}::disability_options, ${age_range}::int4range, ${parent_participation_required}::bool, ${assistant_provided}::bool'
  + ', ${disability_restrooms_available}::bool, ${equipment_provided}, ${sibling_participation}::bool'
  + ', ${kids_to_staff_ratio}::real, ${asl_interpreter_available}::bool, ${closed_circuit_heering_loop_available}::bool'
  + ', ${additional_charge}::bool, ${accomodate_service_animals}::bool, ${onsite_childcare}::bool)', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserting a new activity.'
        });
    })
    .catch(function (err) {
      console.log(req.body);
      return next(err);
    });
}