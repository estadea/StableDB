const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const trainerHorseSportType = (pool, howMany) => {
  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.TRAINER_HORSE_SPORTTYPE} (horse_FK, sportType_FK, trainer_FK) VALUES `;
  rows += insert;

  const sportTypePKList = fs
    .readFileSync("../insert/sportType", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  return new Promise((success, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(
        `
      SELECT horseID_PK, trainerID_PK
      FROM horse h
      JOIN stable s ON h.stable_FK = s.stableID_PK
      JOIN trainer t ON t.stable_FK = s.stableID_PK
    `,
        function (error, results, fields) {
          if (error) {
            console.error("ERROR: ", error);
          }
          connection.release();
          for (let i = 0; i < results.length - 1 && i < howMany; i++) {
            // console.log(results[i]);
            const sportTypePkRND = Math.floor(
              Math.random() * (sportTypePKList.length - 1)
            );

            const row = `("${results[i].horseID_PK}", "${sportTypePKList[sportTypePkRND]}", "${results[i].trainerID_PK}")`;
            rows = rows + row;
            rowArray.push(row);
            if (i !== howMany - 1) {
              rows += ",\n";
            } else {
              rows += ";\n";
            }
          }

          fs.writeFileSync("../insert/trainerHorseSportType", rows);
          success([insert, rowArray, rows]);
        }
      );
    });
  });
};

exports.trainerHorseSportType = trainerHorseSportType;
