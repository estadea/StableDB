const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const trophy = (howMany) => {
  
  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.TROPHY} (trophyID_PK,placement,price) VALUES `
  rows += insert;

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const placement = Math.floor(Math.random() * 12+1);
    const price = Math.floor(Math.random() * 1500);
    
    const row = `("${uuid}", ${placement}, ${price})`
    rows = rows + row;
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }

    keys+=`${uuid}\n`;
  }

  fs.writeFileSync("../insert/trophy", keys);
  return [insert,rowArray, rows];
};

exports.trophy = trophy;
