const fs = require("fs");
const horseOwners = require("./tables/horseOwner");
const stableOwners = require("./tables/stableOwner");
const stable = require("./tables/stable");
const horse = require("./tables/horse");
const employee = require("./tables/employee");
const therapy = require("./tables/therapy");
const vet = require("./tables/vet");
const blacksmith = require("./tables/blacksmith");
const treatment = require("./tables/treatment");
const trainer = require("./tables/trainer");
const sportType = require("./tables/sportType");
const trainerHorseSportType = require("./tables/trainerHorseSportType");
const species = require("./tables/horseSpecies");
const belongsTo = require("./tables/belongsTo");
const event = require("./tables/event");
const competition = require("./tables/competition");
const participates = require("./tables/participates");
const trophy = require("./tables/trophy");
const mysql = require("mysql");

const { CONSTANT } = require("./constants");
const insertDir = CONSTANT.insertDir;

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "HorseStable",
  connectionLimit: 10,
});

if (!fs.existsSync(insertDir)) {
  fs.mkdirSync(insertDir);
}

const names = fs
  .readFileSync("../dataset/names", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => !!f);
const surnames = fs
  .readFileSync("../dataset/surnames", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => !!f);

const addresses = fs
  .readFileSync("../dataset/adresses", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => !!f);
const horseList = fs
  .readFileSync("../dataset/horses", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => !!f);
const sportTypeList = fs
  .readFileSync("../dataset/sportTypes", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => !!f);

const horseSpecies = fs
  .readFileSync("../dataset/species", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => !!f);

const cities = fs
  .readFileSync("../dataset/cities", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => !!f)
  .map((c) => c.trim());

const illnesses = fs
  .readFileSync("../dataset/illnesses", { encoding: "utf8" })
  .toString()
  .split("\n")
  .map((n) => n.replace(/\r/, ""))
  .filter((f) => f.length < 40)
  .filter((f) => f.indexOf('"') === -1)
  .filter((f) => f.indexOf(", ") === -1)
  .filter((f) => !!f);

const Generate = {
  ...horseOwners,
  ...stableOwners,
  ...stable,
  ...horse,
  ...employee,
  ...therapy,
  ...vet,
  ...blacksmith,
  ...treatment,
  ...trainer,
  ...sportType,
  ...trainerHorseSportType,
  ...species,
  ...belongsTo,
  ...event,
  ...competition,
  ...participates,
  ...trophy,
};

const resetDatabase = () => {
  connection.connect();
  const sqlCreationScript = fs
    .readFileSync("../mysql_project.sql", { encoding: "utf8" })
    .toString()
    .replace(/(?:\r\n|\r|\n|\t)/g, "")
    .split(";")
    .filter((q) => !!q);

  // .split("\n")
  // .filter((f) => !!f);
  sqlCreationScript.forEach((query) => {
    query += ";";
    connection.query(query, function (error, results, fields) {
      if (error) {
        console.error("ERROR: ", error);
      }
    });
  });

  connection.end();
};
const generateNewData = () => {
  console.log(
    "Starting to generate " + CONSTANT.insertNumber + " elements for each row"
  );
  const _stableOwners = Generate.stableOwners(
    names,
    surnames,
    addresses,
    CONSTANT.insertNumber
  );
  const _stables = Generate.stable(surnames, addresses, CONSTANT.insertNumber);
  const _employees = Generate.employee(
    names,
    surnames,
    addresses,
    CONSTANT.insertNumber
  );
  const _horseOwners = Generate.horseOwners(
    names,
    surnames,
    addresses,
    CONSTANT.insertNumber
  );
  const _horses = Generate.horse(horseList, CONSTANT.insertNumber);
  const _therapies = Generate.therapy(illnesses, CONSTANT.insertNumber);
  const _vets = Generate.vet(surnames, addresses, CONSTANT.insertNumber);
  const _blacksmiths = Generate.blacksmith(
    surnames,
    addresses,
    CONSTANT.insertNumber
  );
  const _treatments = Generate.treatment(
    surnames,
    addresses,
    CONSTANT.insertNumber
  );
  const _trainers = Generate.trainer(
    names,
    surnames,
    addresses,
    CONSTANT.insertNumber
  );
  const _sportTypes = Generate.sportType(sportTypeList, CONSTANT.insertNumber);
  const _horseSpecies = Generate.species(
    horseSpecies,
    sportTypeList,
    CONSTANT.insertNumber
  );
  const _belongsTo = Generate.belongsTo(CONSTANT.insertNumber);
  const _event = Generate.event(names, cities, CONSTANT.insertNumber);
  const _competition = Generate.competition(
    surnames,
    cities,
    CONSTANT.insertNumber
  );
  const _trophy = Generate.trophy(CONSTANT.insertNumber);

  let fileString = `
  ${_stableOwners[2]}
  ${_stables[2]}
  ${_horseOwners[2]}
  ${_horses[2]}
  ${_employees[2]}
  ${_therapies[2]}
  ${_vets[2]}
  ${_blacksmiths[2]}
  ${_treatments[2]}
  ${_trainers[2]}
  ${_sportTypes[2]}
  ${_horseSpecies[2]}
  ${_belongsTo[2]}
  ${_event[2]}
  ${_competition[2]}
  ${_trophy[2]}`;

  console.log("Inserting data \n");
  insertIntoDb(_stableOwners[0], _stableOwners[1], connection)
    .then(() => insertIntoDb(_stables[0], _stables[1], connection))
    .then(() => insertIntoDb(_horseOwners[0], _horseOwners[1], connection))
    .then(() => insertIntoDb(_horses[0], _horses[1], connection))
    .then(() => insertIntoDb(_employees[0], _employees[1], connection))
    .then(() => insertIntoDb(_therapies[0], _therapies[1], connection))
    .then(() => insertIntoDb(_vets[0], _vets[1], connection))
    .then(() => insertIntoDb(_blacksmiths[0], _blacksmiths[1], connection))
    .then(() => insertIntoDb(_treatments[0], _treatments[1], connection))
    .then(() => insertIntoDb(_trainers[0], _trainers[1], connection))
    .then(() => insertIntoDb(_sportTypes[0], _sportTypes[1], connection))
    .then(() => insertIntoDb(_horseSpecies[0], _horseSpecies[1], connection))
    .then(() => insertIntoDb(_belongsTo[0], _belongsTo[1], connection))
    .then(() => insertIntoDb(_event[0], _event[1], connection))
    .then(() => insertIntoDb(_competition[0], _competition[1], connection))
    .then(() => insertIntoDb(_trophy[0], _trophy[1], connection))

    .then(() => {
      console.log("trainerHorseSportType");
      return Generate.trainerHorseSportType(connection, CONSTANT.insertNumber);
    })
    .then((_trainerHorseSportTypes) => {
      fileString += `
      ${_trainerHorseSportTypes[2]}`;
      return insertIntoDb(
        _trainerHorseSportTypes[0],
        _trainerHorseSportTypes[1],
        connection
      );
    })

    .then((r) => {
      return Generate.participates(connection, surnames, CONSTANT.insertNumber);
    })
    .then((_participates) => {
      fileString += `
      ${_participates[2]}`;
      return insertIntoDb(_participates[0], _participates[1], connection);
    })

    .then(() => {
      console.log("Writing creation insert file");
      fs.writeFileSync("../insert/creationScript", fileString);
    })
    .then((r) => connection.end())
    .catch((e) => {
      console.log("ERROR: ", e);
      connection.end();
    });
};

generateNewData();

// resetDatabase();

function insertIntoDb(base, elements, pool, print) {
  return new Promise((success, reject) => {
    const query = base + "?";
    // console.log(query)
    // console.log(elements)
    const values = [
      ...elements.map((v) =>
        v
          .replace(/\(/g, "")
          .replace(/\)/g, "")
          .replace(/"/g, "")
          .replace(/\r/, "")
          .split(", ")
      ),
    ];

    values.forEach((v) => {
      const ix = v.findIndex((s) => s === "null");

      if (ix !== -1) {
        v[ix] = null;
      }
    });

    print && console.log(values);
    pool.getConnection((err,connection) => {
      connection.query(query, [values], function (error, results, fields) {
        if (error) {
          console.error("ERROR: ", error);
          reject("ERROR: ", error);
          return;
        }
        connection.release();
        console.log(query + " success");
        success(results);
      });
    });
  });
}

// connection.query('select * from stable', function (error, results, fields) {
//   if (error) {
//     console.error("ERROR Query: ", error);
//     reject("ERROR: ", error);
//     return;
//   }
//   console.log(results);
//   connection.end();
// })
