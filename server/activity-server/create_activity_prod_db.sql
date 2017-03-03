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
    phone_number TEXT NOT NULL,
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

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available, 
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available, 
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals, 
onsite_childcare) values('Plant Flowers', cast('2017-04-15' as date), numrange(12.0, 15.0), money(21.50), 
'2859 Dickson Street', 'Seattle', 'WA', 'United States', 98105, '(206)582-1859', 'participants will be learning how to plant trees and flowers.',
true, 'Outdoors&Nature'::activity_options, 'Hearing'::disability_options, int4range(8,10), false, true, false,
'flower seeds, pot', false, 3.0, true, false, false, true, false);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Seattle Basketball', '2017-03-27'::date, numrange('(10.5,16.75)'), money('10.5'),
'5613 NE 139th Street', 'Seattle', 'WA', 'US', '98105'::integer, '(425)643-4329', 'We will be playing basketball on March 27th, 2017!!!!',
'false'::bool, 'Sports'::activity_options, 'Cognitive'::disability_options, '(8,15)'::int4range, 'false'::bool, 'true'::bool, 'true'::bool,
'Basketball. You must bring your own shoes.', 'true'::bool, '7.0'::real, 'false'::bool, 'false'::bool, 'false'::bool, 'true'::bool, 'false'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Bellevue Soccer', '2017-03-16'::date, numrange('(16.00,18.00)'), money('12.5'),
'5613 Bellevue Way NE', 'Bellevue', 'WA', 'US', '98004'::integer, '(425)346-9864', 'Want to learn play soccer? Come join us!',
'false'::bool, 'Sports'::activity_options, 'Sensory'::disability_options, '(4,9)'::int4range, 'true'::bool, 'true'::bool, 'false'::bool,
'Soccer ball', 'true'::bool, '6.0'::real, 'false'::bool, 'false'::bool, 'false'::bool, 'true'::bool, 'false'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Bird Watching', '2017-03-27'::date, numrange('(8.5,16.00)'), money('15.00'),
'1948 81st Ave NE', 'Mercer Island', 'WA', 'US', '98040'::integer, '(425)097-9826', 'Come and learn what kinds of birds are around us!',
'true'::bool, 'Zoo'::activity_options, 'Mobility'::disability_options, '(4,22)'::int4range, 'true'::bool, 'true'::bool, 'true'::bool,
'Water', 'true'::bool, '10.0'::real, 'false'::bool, 'false'::bool, 'false'::bool, 'false'::bool, 'true'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Yoga Fire', '2017-03-09'::date, numrange('(18.0,22.0)'), money('30.00'),
'2861 University Way NE', 'Seattle', 'WA', 'US', '98105'::integer, '(206)198-4309', 'Never thought about doing Yoga? This can be your opportunities to learn what it is!',
'true'::bool, 'Sports'::activity_options, 'Sensory'::disability_options, '(9,16)'::int4range, 'false'::bool, 'false'::bool, 'false'::bool,
'Yoga mattress', 'false'::bool, '15.0'::real, 'false'::bool, 'false'::bool, 'false'::bool, 'true'::bool, 'false'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Drum with Nicolas', '2017-03-21'::date, numrange('(18.00,20.00)'), money('19.99'),
'1689 4th Ave S', 'Seattle', 'WA', 'US', '98134'::integer, '(425)971-1589', 'This can be your first time learning how to play durm! We will start with the very basic.',
'false'::bool, 'Music'::activity_options, 'Vision'::disability_options, '(7,13)'::int4range, 'false'::bool, 'true'::bool, 'true'::bool,
'Drum, Sticks', 'true'::bool, '5.0'::real, 'true'::bool, 'false'::bool, 'true'::bool, 'true'::bool, 'true'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Dessert Tasting', '2017-03-18'::date, numrange('(11.0,15.0)'), money('24.99'),
'5613 Jessica Street', 'Seattle', 'WA', 'US', '94198'::integer, '(206)734-1936', 'We will be exploring different types of desserts by eating them!',
'true'::bool, 'Others'::activity_options, 'Others'::disability_options, '(4,20)'::int4range, 'true'::bool, 'true'::bool, 'true'::bool,
'Desserts', 'true'::bool, '15.0'::real, 'true'::bool, 'true'::bool, 'true'::bool, 'true'::bool, 'true'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Beauty of Art', '2017-03-25'::date, numrange('(9.00,16.00)'), money('20.00'),
'16838 Howard Street', 'Seattle', 'WA', 'US', '98161'::integer, '(206)163-6912', 'Always thought drawing/painting is difficult? Let us teach you how easy and fun it can be!',
'true'::bool, 'Art'::activity_options, 'Mobility'::disability_options, '(6,16)'::int4range, 'true'::bool, 'false'::bool, 'false'::bool,
'Drawing board, pencil, paints, and more', 'true'::bool, '5.0'::real, 'false'::bool, 'true'::bool, 'true'::bool, 'true'::bool, 'true'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Hackathon', '2017-04-01'::date, numrange('(8.00,24.00)'), money('25.00'),
'Paul G. Allen Computer Science Building', 'Seattle', 'WA', 'US', '98105'::integer, '(206)926-1862', 'Hackathon is like a camp because you get to have fun! ;)',
'true'::bool, 'Camps'::activity_options, 'Others'::disability_options, '(14,23)'::int4range, 'true'::bool, 'true'::bool, 'true'::bool,
'Computer, Desk, Chair', 'true'::bool, '10.00'::real, 'true'::bool, 'true'::bool, 'true'::bool, 'true'::bool, 'true'::bool);

INSERT INTO activity_test(activity_name, dates, time_of_day, cost, street_name, city, state, country, zip_code, phone_number,
descriptions, wheelchair_accessible, activity_type, disability_type, age_range,
parent_participation_required, assistant_provided, disability_restrooms_available,
equipment_provided, sibling_participation, kids_to_staff_ratio, asl_interpreter_available,
closed_circuit_heering_loop_available, additional_charge, accomodate_service_animals,
onsite_childcare) values('Exhibition of Capsi Anat', '2017-03-30'::date, numrange('(8.0,18.00)'), money('14.99'),
'Seattle Art Museum', 'Seattle', 'WA', 'US', '98106'::integer, '(206)328-1687', 'We will be having exhibition of famous artist Capsi Anat. Come join us!',
'true'::bool, 'Museum'::activity_options, 'Hearing'::disability_options, '(4,22)'::int4range, 'true'::bool, 'true'::bool, 'true'::bool,
'None', 'false'::bool, '20.00'::real, 'false'::bool, 'true'::bool, 'true'::bool, 'true'::bool, 'false'::bool);