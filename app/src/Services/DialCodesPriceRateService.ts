import MongoDB from "mongodb";
import DatabaseService from "./DatabaseService";


export default {
  collectionName: "DialCodesPriceTableData",
  async getPriceRateTableData() : Promise<unknown>
  {
    const telzirDatabase = await DatabaseService.getTelzirDatabase();
    return await telzirDatabase.collection(this.collectionName).find({}).toArray();
  }
};