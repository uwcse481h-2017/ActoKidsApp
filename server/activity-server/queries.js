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
  // console.log(req.body);
  var json = req.body;
  var a = json.a;
  var b = json.b;
  var c = json.c;
  var d = json.d;
  var e = json.e;
  var f = json.f;
  var g = json.g;
  var h = json.h;
  var i = json.i;
  var j = json.j;
  var k = json.k;
  var l = json.l;
  var m = json.m;
  var n = json.n;
  var o = json.o;
  var p = json.p;
  var q = json.q;
  var r = json.r;
  var s = json.s;
  var t = json.t;
  var u = json.u;
  var v = json.v;
  var w = json.w;
  var x = json.x;
  var y = json.y;

  var str = 'INSERT INTO '+ settings.activity_test_database
  + '(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code,'
  + 'descriptions, wheelchair_accessible, activity_type, disability_type, age_range,'
  + 'parent_participation_required, assistant_provided, disability_restrooms_available,'
  + 'equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,'
  + 'closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,'
  + 'onsite_childcare)'
  + " values('" + a + "', '(" + b + ")'::date, numrange('" + c + "'), money('" + d + "'), '" + e + "', '" + f + "', '" + g + "'"
  + ", '" + h + "', '" + i + "'::integer, '" + j + "', '" + k + "'::bool, '" + l + "'::activity_options"
  + ", '" + m + "'::disability_options, '" + n + "'::int4range, '" + o + "'::bool, '" + p + "'::bool"
  + ", '" + q + "'::bool, '" + r + "', '" + s + "'::bool"
  + ", '" + t + "'::real, '" + u + "'::bool, '" + v + "'::bool"
  + ", '" + w + "'::bool, '" + x + "'::bool, '" + y + "'::bool)";

  // console.log(str);

  db.none(str, req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserting a new activity.'
        });
    })
    .catch(function (err) {
      // console.log(req.body);
      // console.log(res);
      return next(err);
    });
}