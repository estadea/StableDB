const sportType = async (sportTypeCollection, sportTypeList, howMany) => {
    console.log('inserting sportType...');
  const sportTypeInsert = [];
  const length =
    howMany > sportTypeList.length ? sportTypeList.length : howMany;
  for (let i = 0; i < length; i++) {
    sportTypeInsert.push({
      type: sportTypeList[i],
    });
  }
  const result = await sportTypeCollection.insertMany(sportTypeInsert);
  console.log('sportType done!');
};

exports.sportType = sportType;
