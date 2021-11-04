const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const sportType = (sportTypeList, howMany) => {
  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.SPORTTYPE} (sportTypeID_PK, type) VALUES `;
  rows += insert;

  const numberOfType =
    sportTypeList.length > howMany ? howMany : sportTypeList.length;

  for (let i = 0; i < numberOfType; i++) {
    const uuid = uuidv4();
    // const sportTypeRND = Math.floor(Math.random() * (sportTypeList.length - 1));

    const row = `("${uuid}", "${sportTypeList[i]}")`;
    rows = rows + row;
    rowArray.push(row);
    if (i !== numberOfType - 1) {
      rows += ",\n";
    } else {
      rows += ";\n";
    }
    keys += `${uuid}\n`;
  }
  fs.writeFileSync("../insert/sportType", keys);
  return [insert, rowArray, rows];
};

exports.sportType = sportType;
