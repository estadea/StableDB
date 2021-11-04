drop database IF EXISTS HorseStable;
create database HorseStable;
use HorseStable;

create table HorseOwner(
horseOwnerID_PK VARCHAR(40) NOT NULL,
fName VARCHAR(40) NOT NULL,
lName VARCHAR(40) NOT NULL,
address VARCHAR(40) NOT NULL,
PRIMARY KEY(horseOwnerID_PK)
);



create table StableOwner(
stableOwnerID_PK VARCHAR(40) NOT NULL,
fName VARCHAR(40) NOT NULL,
lName VARCHAR(40) NOT NULL,
address VARCHAR(40) NOT NULL,
PRIMARY KEY(stableOwnerID_PK)
);

create table Species(
speciesID_PK VARCHAR(40) NOT NULL,
name VARCHAR(40) NOT NULL,
color VARCHAR(40) NOT NULL,
speciality VARCHAR(40),
height VARCHAR(40),
PRIMARY KEY(speciesID_PK)
);



create table Stable(
stableID_PK VARCHAR(40) NOT NULL,
stableName VARCHAR(40) NOT NULL,
address VARCHAR(40) NOT NULL,
StableOwner_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(stableID_PK),
FOREIGN KEY(StableOwner_FK) REFERENCES StableOwner(stableOwnerID_PK)
);

create table Horse(
horseID_PK VARCHAR(40) NOT NULL,
name VARCHAR(40) NOT NULL,
age INT NOT NULL,
retirement BOOLEAN NOT NULL,
breedingProgram BOOLEAN NOT NULL,
stable_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(horseID_PK),
owner_FK VARCHAR(40) NOT NULL,
FOREIGN KEY (stable_FK) REFERENCES Stable(stableID_PK),
FOREIGN KEY (owner_FK) REFERENCES HorseOwner(horseOwnerID_PK)
);



create table Trainer(
trainerID_PK VARCHAR(40) NOT NULL,
trainerFname VARCHAR(40) NOT NULL,
trainerLname VARCHAR(40) NOT NULL,
address VARCHAR(40) NOT NULL,
stable_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(trainerID_PK),
FOREIGN KEY(stable_FK) REFERENCES Stable(stableID_PK)
);


create table Employee(
employeeID_PK VARCHAR(40) NOT NULL,
fName VARCHAR(40) NOT NULL,
lName VARCHAR(40) NOT NULL,
address VARCHAR(40) NOT NULL,
stable_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(employeeID_PK),
FOREIGN KEY(stable_FK) REFERENCES Stable(stableID_PK)
);

create table belongsTo(
horse_FK VARCHAR(40) NOT NULL,
species_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(horse_FK,species_FK),
FOREIGN KEY(horse_FK) REFERENCES Horse(horseID_PK),
FOREIGN KEY(species_FK) REFERENCES Species(speciesID_PK)
);


create table Vet(
vetID_PK VARCHAR(40) NOT NULL,
officeName VARCHAR(40) NOT NULL,
address VARCHAR(40) NOT NULL,
PRIMARY KEY(vetID_PK)
);

create table Blacksmith(
blacksmithID_PK VARCHAR(40) NOT NULL,
OfficeName VARCHAR(40) NOT NULL,
address VARCHAR(40) NOT NULL,
PRIMARY KEY(blacksmithID_PK)
);


create table Therapy(
therapyID_PK VARCHAR(40) NOT NULL,
nameIllness VARCHAR(40) DEFAULT ' ',
horse_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(therapyID_PK),
FOREIGN KEY(horse_FK) REFERENCES Horse(horseID_PK)
);


create table Treatment(
treatmentID_PK VARCHAR(40) NOT NULL,
description VARCHAR(40) NOT NULL,
vet_FK VARCHAR(40), 
blacksmith_FK VARCHAR(40),
therapy_FK VARCHAR(40) NOT NULL, 
PRIMARY KEY(treatmentID_PK),
FOREIGN KEY(vet_FK) REFERENCES Vet(vetID_PK),
FOREIGN KEY(blacksmith_FK) REFERENCES Blacksmith(blacksmithID_PK),
FOREIGN KEY(therapy_FK) REFERENCES Therapy(therapyID_PK)
);

create table Trophy(
trophyID_PK VARCHAR(40) NOT NULL,
placement INT NOT NULL,
price INT,
PRIMARY KEY(trophyID_PK)
);



create table Event(
eventID_PK VARCHAR(40) NOT NULL,
name VARCHAR(40) NOT NULL,
organizer VARCHAR(40) NOT NULL,
PRIMARY KEY(eventID_PK)
);

create table SportType(
sportTypeID_PK VARCHAR(40) NOT NULL,
type VARCHAR(40) NOT NULL,
PRIMARY KEY(sportTypeID_PK)
);

create table TrainerHorseSportType(
horse_FK VARCHAR(40) NOT NULL,
sportType_FK VARCHAR(40) NOT NULL,
trainer_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(horse_FK,sportType_FK,trainer_FK),
FOREIGN KEY(horse_FK) REFERENCES Horse(horseID_PK),
FOREIGN KEY(sportType_FK) REFERENCES SportType(sportTypeID_PK),
FOREIGN KEY(trainer_FK) REFERENCES Trainer(trainerID_PK)
);


create table Competition(
competitionID_PK VARCHAR(40) NOT NULL,
name VARCHAR(40) NOT NULL,
stadium VARCHAR(40) NOT NULL,
event_FK VARCHAR(40) NOT NULL,
sportType_FK VARCHAR(40) NOT NULL,
PRIMARY KEY(competitionID_PK),
FOREIGN KEY(event_FK) REFERENCES Event(eventID_PK),
FOREIGN KEY(sportType_FK) REFERENCES SportType(sportTypeID_PK)
);


create table participates(
horse_FK VARCHAR(40) NOT NULL,
trophy_FK VARCHAR(40), /* can be null */
competition_FK VARCHAR(40) NOT NULL,
nameRider VARCHAR(40) DEFAULT ' ',
nameTeam VARCHAR(40) DEFAULT ' ',
FOREIGN KEY(horse_FK) REFERENCES Horse(horseID_PK),
FOREIGN KEY(trophy_FK) REFERENCES Trophy(trophyID_PK),
FOREIGN KEY(competition_FK) REFERENCES Competition(competitionID_PK)
);





DELIMITER $$

CREATE TRIGGER check_horseXcompetition
    BEFORE INSERT
    ON participates FOR EACH ROW
BEGIN
    DECLARE rowcount INT;
    select count(*)
    INTO rowcount
    FROM Horse h
    JOIN TrainerHorseSportType t ON h.horseID_PK = t.horse_FK
    JOIN SportType s ON t.sportType_FK = s.sportTypeID_PK
    JOIN Competition c ON c.sportType_FK = s.sportTypeID_PK
    WHERE new.horse_FK = h.horseID_PK AND new.competition_FK = c.competitionID_PK;

    IF rowcount = 0 THEN
		signal sqlstate '45000' SET MESSAGE_TEXT = 'The horse cannot partecipate to this competition.';
	END IF;

END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER check_trainerXhorse
	BEFORE INSERT
    ON TrainerHorseSportType FOR EACH ROW
BEGIN
	DECLARE rowcount INT;
    SELECT COUNT(*)
    INTO rowcount
    FROM horse h
    JOIN stable s ON h.stable_FK = s.stableID_PK
    JOIN trainer t ON t.stable_FK = s.stableID_PK
    WHERE new.horse_FK = h.horseID_PK AND new.trainer_FK = t.trainerID_PK;
    
    IF rowcount = 0 THEN
    signal sqlstate '02000' SET MESSAGE_TEXT = 'This trainer cannot be assigned to this horse.';
    END IF;
END$$

DELIMITER ;
