const { ObjectId } = require("mongodb");
const mongoConnection = require("./connection");
const stable = require("./collections/stable");
const trainer = require("./collections/trainer");
const horse = require("./collections/horse");
const sportType = require("./collections/sportType");
const specie = require("./collections/specie");
const fs = require("fs");

(async function () {
  const { db, client, collections } = await mongoConnection.create();

  const names = fs
    .readFileSync("../dataset/names", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);
  const surnames = fs
    .readFileSync("../dataset/surnames", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  const addresses = fs
    .readFileSync("../dataset/adresses", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  const horses = fs
    .readFileSync("../dataset/horses", { encoding: "utf8" })
    .toString()
    .split("\n")
    .filter((f) => !!f);

  const horseSpecies = fs
    .readFileSync("../dataset/species", { encoding: "utf8" })
    .toString()
    .split("\n")
    .map((n) => n.replace(/\r/, ""))
    .filter((f) => !!f);

  const sportTypeList = fs
    .readFileSync("../dataset/sportTypes", { encoding: "utf8" })
    .toString()
    .split("\n")
    .map((n) => n.replace(/\r/, ""))
    .filter((f) => !!f);

  const Generate = {
    ...stable,
    ...trainer,
    ...horse,
    ...sportType,
    ...specie
  };

  const NUMBER_OF_INSERT = 1000000;

  // await Generate.stable(
  //   collections.stableCollection,
  //   surnames,
  //   addresses,
  //   NUMBER_OF_INSERT
  // );

  // await Generate.sportType(
  //   collections.sportTypeCollection,
  //   sportTypeList,
  //   NUMBER_OF_INSERT
  // );
  // await Generate.specie(
  //   collections.specieCollection,
  //   horseSpecies,
  //   NUMBER_OF_INSERT
  // );

  // await Generate.trainer(
  //   collections.trainerCollection,
  //   collections.stableCollection,
  //   collections.sportTypeCollection,
  //   names,
  //   surnames,
  //   addresses,
  //   NUMBER_OF_INSERT
  // );

  // await Generate.horse(
  //   horses,
  //   collections.stableCollection,
  //   collections.trainerCollection,
  //   collections.sportTypeCollection,
  //   collections.specieCollection,
  //   collections.horseCollection,
  //   NUMBER_OF_INSERT
  // );

  //   const trainerResult = await collections.trainerCollection.findOne({});
  //   const dbref = trainerResult.stable;
  //   const stableResult = await collections.stableCollection.findOne({
  //     _id: dbref.oid,
  //   });

  //   const tr = {
  //     ...trainerResult,
  //     stable: {
  //       ...stableResult,
  //     },
  //   };
  //   console.log(tr);

  // const horsesResult = await collections.horseCollection.find({}).toArray();
  // // console.log(horsesResult)
  // const result = horsesResult.filter(h=>{
  //   return !!h.sportType.find(s=>{
  //     return s.type.toLowerCase() === 'dressage'
  //   })
  // })
  // console.log(result);
  client.close();
})();


