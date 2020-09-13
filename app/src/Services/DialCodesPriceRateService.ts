import MongoDB from "mongodb";

/**
 * Mediates interaction with database regarding
 * dial codes price rates.
 */
export default class DialCodesPriceRateService
{
  /**
   * Retrieves price rate table data.
   * 
   * Pre Conditions:
   * - Must receive appropriate response from database.
   */
  public static async getPriceRateTableData(database : MongoDB.Db) : Promise<unknown>
  {
    return await database.collection(DialCodesPriceRateService.collectionName).find({}).toArray();
  }

  public static collectionName = "DialCodesPriceTableData";
}