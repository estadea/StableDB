const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const therapy = (illnessList, howMany) => {

  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.THERAPY} (therapyID_PK, nameIllness, horse_FK) VALUES `;
  rows += insert;

    const horsePkList = fs
    .readFileSync("../insert/horse", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);


  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const horsesRND = Math.floor(Math.random() * (horsePkList.length - 1));
    const illnessListRND = Math.floor(Math.random() * (illnessList.length - 1));
    const row = `("${uuid}", "${illnessList[illnessListRND]}", "${horsePkList[horsesRND]}")`;
    rows +=row;
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }
    keys+=`${uuid}\n`;
  }
  fs.writeFileSync("../insert/therapy", keys);
  return [insert,rowArray, rows];
};

exports.therapy = therapy;