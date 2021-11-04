const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const competition = (surnameList, cityList, howMany) => {

  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.COMPETITION} (competitionID_PK, name, stadium, event_FK, sportType_FK) VALUES `
  rows += insert;


  const eventPKList = fs
    .readFileSync("../insert/event", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  const sportTypePKList = fs
    .readFileSync("../insert/sportType", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const surnameRND = Math.floor(Math.random() * (surnameList.length - 1));
    const cityRND = Math.floor(Math.random() * (cityList.length - 1));
    const sportTypePkRND = Math.floor(
      Math.random() * (sportTypePKList.length - 1)
    );
    const eventPkRND = Math.floor(Math.random() * (eventPKList.length - 1));
    
      const row = `("${uuid}", "${surnameList[surnameRND]}", "${cityList[cityRND]}", "${eventPKList[eventPkRND]}", "${sportTypePKList[sportTypePkRND]}")`
      rows = rows + row;
      rowArray.push(row);
      if(i!== howMany-1){
        rows+=',\n'
      } else {
        rows+=';\n'
      }

      keys += `${uuid}\n`;
  }
  fs.writeFileSync("../insert/competition", keys);
  return [insert,rowArray, rows];
};

exports.competition = competition;
