const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const belongsTo = (howMany) => {

  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT IGNORE INTO ${TABLENAME.BELONGS_TO} (horse_FK, species_FK) VALUES `
  rows += insert;

  const horsePkList = fs
    .readFileSync("../insert/horse", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  const speciesPkList = fs
    .readFileSync("../insert/species", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const speciesPkRND = Math.floor(Math.random() * (speciesPkList.length - 1));
    const horsePkRND = Math.floor(Math.random() * (horsePkList.length - 1));
    
    const row = `("${horsePkList[horsePkRND]}", "${speciesPkList[speciesPkRND]}")`
    rows = rows + row;
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }
    keys += `${uuid}\n`;
  }
  fs.writeFileSync("../insert/species", keys);
  return [insert,rowArray, rows];
};
exports.belongsTo = belongsTo;
