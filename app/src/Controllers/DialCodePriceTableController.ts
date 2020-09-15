import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT}/dialCodesPriceRate`
});

/**
 * Mediates interaction with API endpoints
 * regarding dial code price rates.
 * 
 * Class Invariants:
 * None
 * 
 */
export default class DialCodePriceTableController 
{
  /**
   * Retrieves dial code price rates table data.
   * 
   * Pre Conditions:
   * - Must receive appropriate response from server.
   */
  public static async getPriceRateTableData() : Promise<unknown>
  {
    const response = await api.get("");
    const serializedData = await response.data;
    return serializedData;
  }
}
