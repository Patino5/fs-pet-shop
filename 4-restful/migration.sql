-- -- Create Data base 
-- CREATE DATABASE petsdb;

-- \c petsdb;

-- Create the table
DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial PRIMARY KEY,
    name varchar(20),
    kind varchar(20),
    age integer
);

INSERT INTO pets (name, kind, age) VALUES ('Fang', 'Dog', 10);
INSERT INTO pets (name, kind, age) VALUES ('Hedwig', 'Owl', 2);
INSERT INTO pets (name, kind, age) VALUES ('Crookshanks', 'Cat', 8);
INSERT INTO pets (name, kind, age) VALUES ('Scabbers', 'Rat', 43);
INSERT INTO pets (name, kind, age) VALUES ('Fawkes', 'Phoenix', 10);
INSERT INTO pets (name, kind, age) VALUES ('Buckbeak', 'Hippogriff', 2);
INSERT INTO pets (name, kind, age) VALUES ('Trevor', 'Toad', 8);
INSERT INTO pets (name, kind, age) VALUES ('Nagini', 'Snake', 3);

