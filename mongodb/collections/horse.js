const { ObjectId } = require("mongodb");
const { trainer } = require("./trainer");

const horse = async (
  horseList,
  stableCollection,
  trainerCollection,
  sportTypeCollection,
  specieCollection,
  horseCollection,
  howMany
) => {
  console.log('inserting horse...');
  const stables = await stableCollection.find({}).toArray();
  const trainers = await trainerCollection.find({}).toArray();
  const sportTypes = await sportTypeCollection.find({}).toArray();
  const species = await specieCollection.find({}).toArray();

  // console.log(stables);
  // console.log(trainers);
  const stMap = {};
  sportTypes.forEach((s) => {
    const filter = trainers.filter((t) =>
      t.sportTypes.find((sp) => sp._id.equals(s._id))
    );
    stMap[s.type] = filter;
  });

  const horseInsert = [];
  for (let i = 0; i < howMany; i++) {
    const stableRND = Math.floor(Math.random() * (stables.length - 1));
    //   const trainerRND = Math.floor(Math.random() * (trainers.length - 1));
    const horseRND = Math.floor(Math.random() * (horseList.length - 1));
    const specieRND = Math.floor(Math.random() * (species.length - 1));

    const age = Math.floor(Math.random() * 25);
    const retirement = age > 11;
    const breedingProgram = !!Math.floor(Math.random() * 2);
    const stable = stables[stableRND];

    const numberOfSportTypes = Math.floor(Math.random() * 3 + 1);
    const trainerList = [];
    const sportTypeList = [];
    for (let i = 0; i < numberOfSportTypes; i++) {
      const sportTypeRND = Math.floor(Math.random() * (sportTypes.length - 1));
      const sportType = sportTypes[sportTypeRND];
      sportTypeList.push(sportType);
      const trainerRnd = Math.floor(
        Math.random() * (stMap[sportType.type].length - 1)
      );
      trainerList.push(stMap[sportType.type][trainerRnd]);
    }
    horseInsert.push({
      name: horseList[horseRND],
      age: age,
      retirement: retirement,
      breedingProgram: breedingProgram,
      stable: stable,
      trainer: trainerList,
      sportType: sportTypeList,
      specie:species[specieRND]
    });
  }

  const result = await horseCollection.insertMany(horseInsert);
  console.log('horse done!');
  // console.log(result);
};

exports.horse = horse;
