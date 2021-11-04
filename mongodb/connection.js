const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";
const dbName = "stable";

const create = async () => {
  try {
    // const result = await findTest(horseCollection);
    // console.log(result);

    // const insertResult = await insertHorse(horseCollection);
    // console.log(insertResult.insertedCount);

    // const result = await remove(horseCollection);
    // console.log(result.deletedCount);

    const client = new MongoClient(uri);
    await connect(client);

    const db = client.db(dbName);
    const horseCollection = db.collection("horse");
    const trainerCollection = db.collection("trainer");
    const stableCollection = db.collection("stable");
    const sportTypeCollection = db.collection("sportType");
    const specieCollection = db.collection("specie");
    return {
      db,
      client,
      collections: { horseCollection, trainerCollection, stableCollection, sportTypeCollection, specieCollection },
    };
  } catch (e) {
    console.log(e);
    client.close();
  }
};

async function insertHorse(horseCollection) {
  try {
    const result = horseCollection.insertOne({
      name: "Nilo2",
      age: 4,
      colour: "Dark Red",
      trainers: [
        {
          name: "Skadi!",
          sportType: "Jump",
        },
        {
          name: "Qwerty~",
          sportType: "Sleeping",
        },
      ],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function connect(client) {
  try {
    await client.connect();
    console.log("Connected!");
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function findTest(collection) {
  try {
    const result = await collection
      .find({
        _id: ObjectId("601f24ca4cf2e12d63fbd461"),
      })
      .toArray();
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function remove(collection) {
  try {
    return await collection.deleteMany({});
  } catch (error) {
    console.log(error);
  }
}

exports.create = create;
