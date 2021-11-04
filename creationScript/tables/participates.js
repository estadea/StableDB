const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const participates = (pool, surnames, howMany = 200) => {
  let rows = "";
  let keys = "";

  const rowArray = [];

  const insert = `INSERT IGNORE INTO ${TABLENAME.PARTICIPATES} (horse_FK, trophy_FK, competition_FK, nameRider, nameTeam) VALUES `;
  rows += insert;

  const trophyPKList = fs
    .readFileSync("../insert/trophy", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);
  return new Promise((success, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(
        `
            SELECT horseID_PK, competitionID_PK
            FROM Horse h
            JOIN TrainerHorseSportType t ON h.horseID_PK = t.horse_FK
            JOIN SportType s ON t.sportType_FK = s.sportTypeID_PK
            JOIN Competition c ON c.sportType_FK = s.sportTypeID_PK
            LIMIT 200000
        `,
        function (error, results, fields) {
          if (error) {
            console.error("ERROR: ", error);
          }
          console.log('participates: ',results.length);
          connection.release();
          // console.log("The solution is: ", results);

          for (let i = 0; i < results.length - 1 && i < howMany; i++) {
            // console.log(results[i]);
            const trophyPkRND = Math.floor(
              Math.random() * (trophyPKList.length - 1)
            );
            const riderListRND = Math.floor(
              Math.random() * (surnames.length - 1)
            );
            const teamListRND = Math.floor(
              Math.random() * (surnames.length - 1)
            );

            const row = `("${results[i].horseID_PK}", "${trophyPKList[trophyPkRND]}", "${results[i].competitionID_PK}", "${surnames[riderListRND]}", "${surnames[teamListRND]}")`;
            rows = rows + row;
            rowArray.push(row);
            if (i !== howMany - 1) {
              rows += ",\n";
            } else {
              rows += ";\n";
            }
          }
          fs.writeFileSync("../insert/participates", rows);
          success([insert, rowArray, rows]);
        }
      );
    });
  });
};

exports.participates = participates;
