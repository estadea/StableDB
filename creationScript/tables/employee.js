const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const employee = (nameList, surnameList, addressList, howMany) => {

  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.EMPLOYEE} (employeeID_PK, fName, LName, address, stable_FK) VALUES `
  rows += insert;


  const stablePkList = fs
    .readFileSync("../insert/stable", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);
  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const nameRND = Math.floor(Math.random() * (nameList.length - 1));
    const surnameRND = Math.floor(Math.random() * (surnameList.length - 1));
    const addressRND = Math.floor(Math.random() * (addressList.length - 1));
    const stablePkRND = Math.floor(Math.random() * (stablePkList.length - 1));
    const row = `("${uuid}", "${nameList[nameRND]}", "${surnameList[surnameRND]}", "${addressList[addressRND]}", "${stablePkList[stablePkRND]}")`;
    rows = rows + row
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }
    keys = keys + `${uuid}\n`;
  }

  fs.writeFileSync("../insert/employee", keys);

  return [insert,rowArray, rows];
};

exports.employee = employee;
