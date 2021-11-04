const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const vet = (officeNameList, addressList, howMany) => {

  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.VET} (vetID_PK, officeName, address) VALUES `
  rows += insert;

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const officeNameRND = Math.floor(Math.random() * (officeNameList.length - 1));
    const addressRND = Math.floor(Math.random() * (addressList.length - 1));

    const row = `("${uuid}", "${officeNameList[officeNameRND]}", "${addressList[addressRND]}")`
    rows = rows + row;
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }
    keys+=`${uuid}\n`;

  }

  fs.writeFileSync("../insert/vet", keys);
    return [insert,rowArray, rows];
};

exports.vet = vet;
