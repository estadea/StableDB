const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const event = (nameList, organiserList, howMany) => {
  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.EVENT} (eventID_PK, name, organizer) VALUES `
  rows += insert;

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const nameRND = Math.floor(Math.random() * (nameList.length - 1));
    const organiserRND = Math.floor(Math.random() * (organiserList.length - 1));

    const row = `("${uuid}", "${nameList[nameRND]}", "${organiserList[organiserRND]}")`
    rows = rows + row;
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }

    keys+=`${uuid}\n`;
  }
  fs.writeFileSync("../insert/event", keys);
  return [insert,rowArray, rows];
};

exports.event = event;
