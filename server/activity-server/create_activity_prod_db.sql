/* creates actokids database if doesn't exist */
DROP DATABASE IF EXISTS actokids;
CREATE DATABASE actokids;

\c actokids;

/* Create enums for activity types and disability types */
CREATE TYPE activity_options AS ENUM('Outdoors&Nature', 'Sports', 'Zoo', 'Music', 'Art', 'Camps', 'Museum', 'Others');

CREATE TYPE disability_options AS ENUM('Cognitive', 'Mobility', 'Hearing', 'Vision', 'Sensory', 'Others');

/* create activity_test table*/
CREATE TABLE activity_test (
    activity_name TEXT NOT NULL,
    dates DATE NOT NULL CHECK(dates >= current_date),
    time_of_day NUMRANGE NOT NULL,
    cost MONEY NOT NULL CHECK(cost >= 0.0::money),
    street_name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    zip_code INTEGER,
    descriptions TEXT NOT NULL,
    wheelchair_accessible BOOLEAN NOT NULL,
    activity_type activity_options NOT NULL DEFAULT 'Others',
    disability_type disability_options NOT NULL,
    age_range INT4RANGE NOT NULL CHECK(age_range <@ int4range(0, 25)),
    parent_participation_required BOOLEAN NOT NULL,
    assistant_provided BOOLEAN NOT NULL,
    disability_restrooms_available BOOLEAN NOT NULL,
    equipment_provided TEXT,
    sibling_participation BOOLEAN,
    kids_to_staff_ratio REAL,
    asl_interpreter_available BOOLEAN,
    closed_circuit_heering_loop_available BOOLEAN,
    additional_charge BOOLEAN,
    accomodate_service_animals BOOLEAN,
    onsite_childcare BOOLEAN
);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available, 
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available, 
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals, 
onsite_childcare) values('Fun Activity', cast('2017-02-24' as date), numrange(12.0, 15.0), money(21.50), 
'1234 Random Street', 'Seattle', 'WA', 'United States', 98105, 'An activity created for testing purpose only',
true, 'Zoo'::activity_options, 'Mobility'::disability_options, int4range(5,10), false, true, false,
'equp 1', false, 3.0, true, false, false, true, false);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('random_activity', '2017-02-27'::date, numrange('(10.5,16.75)'), money('10.5'),
'5613_Random_Street', 'Seattle', 'WA', 'US', '98105'::integer,'only_for_testing_purpose',
'true'::bool, 'Zoo'::activity_options, 'Mobility'::disability_options, '(4,11)'::int4range, 'false'::bool, 'true'::bool, 'true'::bool,
'abc', 'true'::bool, '1.5'::real, 'false'::bool, 'false'::bool, 'false'::bool, 'true'::bool, 'false'::bool);