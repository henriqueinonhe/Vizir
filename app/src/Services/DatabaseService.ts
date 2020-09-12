import MongoDB from "mongodb";

let telzirDatabase : MongoDB.Db;

export default {
  async connect() : Promise<void>
  {
    const mongoClient = new MongoDB.MongoClient(
      process.env.DB_URI!,
      { useUnifiedTopology: true }
    );

    await mongoClient.connect();
  },
  async getTelzirDatabase() : Promise<MongoDB.Db>
  {
    const mongoClient = new MongoDB.MongoClient(
      process.env.DB_URI!,
      { useUnifiedTopology: true }
    );

    if(!telzirDatabase)
    {
      await mongoClient.connect();
    }

    return mongoClient.db("telzir");
  }

  
};