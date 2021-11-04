const { v4: uuidv4 } = require("uuid");
const { CONSTANT } = require("../constants");
const fs = require("fs");
const TABLENAME = CONSTANT.TABLENAME;

const colours = ["black", "brown", "white", "grey", "spotted", "red"];

const species = (speciesList, sportTypeList, howMany) => {
  let rows = "";
  let keys = "";
  const rowArray = [];
  const insert = `INSERT INTO ${TABLENAME.SPECIES} (speciesID_PK, name, color, speciality, height) VALUES `
  rows += insert;
  const numberOfType = speciesList.length > howMany ? howMany : speciesList.length;
  for (let i = 0; i < numberOfType; i++) {
    const uuid = uuidv4();
    const speciesRND = Math.floor(Math.random() * (speciesList.length - 1));
    const sportTypeRND = Math.floor(Math.random() * (sportTypeList.length - 1));
    const coloursRND = Math.floor(Math.random() * (colours.length - 1));
    const height = Math.floor(Math.random() * 100 + 100);
    
    const row = `("${uuid}", "${speciesList[speciesRND]}", "${colours[coloursRND]}", "${sportTypeList[sportTypeRND]}", "${height}")`
    rows = rows + row;
    rowArray.push(row);
    if(i!== numberOfType-1){
      rows+=',\n'
    } else {
      rows+=';\n'
    }
    keys += `${uuid}\n`;
  }
  fs.writeFileSync("../insert/species", keys);
  return [insert,rowArray, rows];

};

exports.species = species;
