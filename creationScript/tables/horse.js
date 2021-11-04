const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const horse = (horseList, howMany) => {
  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.HORSE} (horseID_PK, name, age, retirement, breedingProgram, stable_FK, owner_FK) VALUES `;
  rows += insert;

  const ownerPKList = fs
    .readFileSync("../insert/horseOwner", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);
  const stablePkList = fs
    .readFileSync("../insert/stable", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const ownerPkRND = Math.floor(Math.random() * (ownerPKList.length - 1));
    const stablePkRND = Math.floor(Math.random() * (stablePkList.length - 1));
    const horsesRND = Math.floor(Math.random() * (horseList.length - 1));

    const age = Math.floor(Math.random() * 25);
    const retirement = age > 11 ? 1 : 0;
    const breedingProgram = Math.floor(Math.random() * 2);
    const row = `("${uuid}", "${horseList[horsesRND]}", ${age}, ${retirement}, ${breedingProgram}, "${stablePkList[stablePkRND]}", "${ownerPKList[ownerPkRND]}")`;
    rows = rows + row;
    rowArray.push(row);

    if (i !== howMany - 1) {
      rows += ",\n";
    } else {
      rows += ";\n";
    }
    keys += `${uuid}\n`;
  }
  fs.writeFileSync("../insert/horse", keys);
  return [insert, rowArray, rows];
};

exports.horse = horse;
