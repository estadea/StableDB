const specie = async (
    specieCollection,
    speciesList,
    howMany
  ) => {
    console.log('inserting species...');
    const specieInsert = [];
    const length =
    howMany > speciesList.length ? speciesList.length : howMany;
    for (let i = 0; i < length; i++) {
      specieInsert.push({
        name: speciesList[i],
      });
      
    }
    const result = await specieCollection.insertMany(specieInsert);
    console.log('species done!');
  };
  
  
  exports.specie = specie;
  