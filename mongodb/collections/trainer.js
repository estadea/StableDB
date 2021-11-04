const { ObjectId } = require("mongodb");

const trainer = async (
  trainerCollection,
  stableCollection,
  sportTypeCollection,
  nameList,
  surnameList,
  addressList,
  howMany
) => {
  console.log('inserting trainer...');
  const stables = await stableCollection.find({}).toArray();
  const sportTypes = await sportTypeCollection.find({}).toArray();
  const trainerInsert = [];

  for (let i = 0; i < howMany; i++) {
    const nameRND = Math.floor(Math.random() * (nameList.length - 1));
    const surnameRND = Math.floor(Math.random() * (surnameList.length - 1));
    const addressRND = Math.floor(Math.random() * (addressList.length - 1));
    const stableRND = Math.floor(Math.random() * (stables.length - 1));
    const sportTypeArray = []
    const numberOfSportTypes = Math.floor(Math.random() * 3 + 1);
    for(let i = 0; i< numberOfSportTypes; i++){
      const sportTypeRND = Math.floor(Math.random() * (sportTypes.length - 1));  
      sportTypeArray.push(
        sportTypes[sportTypeRND]
      )
    }
    const stable = stables[stableRND];
    trainerInsert.push({
      trainerFname: surnameList[surnameRND],
      trainerLname: nameList[nameRND],
      address: addressList[addressRND],
      sportTypes:sportTypeArray,
      stable: stable
    });
  }

  const result = await trainerCollection.insertMany(trainerInsert);
  console.log('trainer done!');
};

exports.trainer = trainer;
