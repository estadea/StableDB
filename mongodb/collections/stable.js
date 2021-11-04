const stable = async (
  stableCollection,
  stableNameList,
  addressList,
  howMany
) => {
  console.log('inserting stable...');
  const stableInsert = [];
  for (let i = 0; i < howMany; i++) {
    const surnameRND = Math.floor(Math.random() * (stableNameList.length - 1));
    const addressRND = Math.floor(Math.random() * (addressList.length - 1));
    stableInsert.push({
      stableName: stableNameList[surnameRND],
      address: addressList[addressRND],
    });
    // insert(stableCollection, stableNameList[surnameRND], addressList[addressRND]);
  }
  const result = await stableCollection.insertMany(stableInsert);
  console.log('stable done!');
};


exports.stable = stable;
