import MongoDB from "mongodb";

let telzirDatabase : MongoDB.MongoClient;

/**
 * Mediates database interaction.
 */
export default class DatabaseService
{
  /**
   * Connects to a database and returns client.
   * 
   * Pre Conditions:
   * - Connection must be successful.
   */
  public static async connect(uri : string) : Promise<MongoDB.MongoClient>
  {
    const mongoClient = new MongoDB.MongoClient(
      uri,
      { useUnifiedTopology: true }
    );

    return await mongoClient.connect();
  }

  /**
   * Returns instance of telzir database connection.
   * 
   * Acts as a singleton always returning the same instance.
   * 
   * Pre Conditions:
   * - Connection must be successful.
   */
  public static async getTelzirDatabase(uri : string) : Promise<MongoDB.MongoClient>
  {
    if(!telzirDatabase)
    {
      telzirDatabase = await DatabaseService.connect(uri);
    }

    return telzirDatabase;
  }

  public static telzirDatabaseName = "telzir";
}