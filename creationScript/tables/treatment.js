const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const treatment = (stableNameList, addressList, howMany) => {

  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.TREATMENT} (treatmentID_PK, therapy_FK, description, vet_FK, blacksmith_FK) VALUES `
  rows += insert;

  const blacksmithPKList = fs
    .readFileSync("../insert/blacksmith", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);
  const vetPkList = fs
    .readFileSync("../insert/vet", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);
  const therapyPkList = fs
    .readFileSync("../insert/therapy", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  for (let i = 0; i < howMany; i++) {
    const uuid = uuidv4();
    const bsPkRND = Math.floor(Math.random() * (blacksmithPKList.length - 1));
    const vetPkRND = Math.floor(Math.random() * (vetPkList.length - 1));
    const therapyPkRND = Math.floor(Math.random() * (therapyPkList.length - 1));
    const who = Math.floor(Math.random() * 3);

    let vetFK = null;
    let bsFK = null;
    let description = "operated by ";
    let row = ``;
    switch (who) {
      case 0: {
        //bs
        bsFK = blacksmithPKList[bsPkRND];
        description += "the blacksmith";
        row += `("${uuid}", "${therapyPkList[therapyPkRND]}", "${description}", null, "${bsFK}")`;
        break;
      }
      case 1: {
        //vet
        vetFK = vetPkList[vetPkRND];
        description += "the vet";
        row += `("${uuid}", "${therapyPkList[therapyPkRND]}", "${description}", "${vetFK}", null)`;
        break;
      }
      case 2: {
        bsFK = blacksmithPKList[bsPkRND];
        vetFK = vetPkList[vetPkRND];
        description += "the blacksmith and the vet";
        row += `("${uuid}", "${therapyPkList[therapyPkRND]}", "${description}", "${vetFK}", "${bsFK}")`;
        // both
        break;
      }
    }

    rows += `${row}`;
    rowArray.push(row);
    if(i!== howMany-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }
    keys += `${uuid}\n`;
  }

  fs.writeFileSync("../insert/treatment", keys);
  return [insert,rowArray, rows];
};

exports.treatment = treatment;
