const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const stable = (stableNameList, addressList, howMany) => {
  const ownerPKList = fs
    .readFileSync("../insert/stableOwner", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  let rows = '';
  let keys = '';

  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.STABLE} (stableID_PK, stableName, address, StableOwner_FK) VALUES `
  rows += insert;
  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const surnameRND = Math.floor(Math.random() * (stableNameList.length - 1));
    const addressRND = Math.floor(Math.random() * (addressList.length - 1));
    const ownerPkRND = Math.floor(Math.random() * (ownerPKList.length - 1));
    if(!ownerPKList[ownerPkRND]){
      console.log(ownerPkRND)
    }
    const row =`("${uuid}", "${stableNameList[surnameRND]}", "${addressList[addressRND]}", "${ownerPKList[ownerPkRND]}")`;
    rows +=row;

    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }

    keys+=`${uuid}\n`;
  }

  fs.writeFileSync("../insert/stable", keys);
  return [insert,rowArray, rows];
};

exports.stable = stable;
