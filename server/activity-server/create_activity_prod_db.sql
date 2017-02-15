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
    equipment_provided TEXT[],
    sibling_participation BOOLEAN,
    kids_to_staff_ratio REAL,
    asl_interpreter_available BOOLEAN,
    closed_circuit_heering_loop_available BOOLEAN,
    additional_charge BOOLEAN,
    accomodate_service_animals BOOLEAN,
    onsite_childcare BOOLEAN
);

