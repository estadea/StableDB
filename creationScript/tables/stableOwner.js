const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const stableOwners = (nameList, surnameList, addressList, howMany) => {
  let rows = "";
  let keys = "";
  const insert = `INSERT INTO ${TABLENAME.STABLE_OWNER} (stableOwnerID_PK, fName, lName, address) VALUES `;
  rows += insert;

  const rowArray = [];

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const nameRND = Math.floor(Math.random() * (nameList.length - 1));
    const surnameRND = Math.floor(Math.random() * (surnameList.length - 1));
    const addressRND = Math.floor(Math.random() * (addressList.length - 1));
    const row = `("${uuid}", "${nameList[nameRND]}", "${surnameList[surnameRND]}", "${addressList[addressRND]}")`;    rows =
    rows = rows + row;
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }
    keys = keys + `${uuid}\n`;
  }

  fs.writeFileSync("../insert/stableOwner", keys);

  return [insert,rowArray, rows];
}



exports.stableOwners = stableOwners;