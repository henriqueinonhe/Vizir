import DialCodePriceRateTable from "../Models/DialCodePriceRateTable";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/dialCodesPriceRate"
});

export default {
  async getPriceRateTable() : Promise<DialCodePriceRateTable>
  {
    const response = await api.get("");
    const serializedData = await response.data;
    return DialCodePriceRateTable.deserialize(serializedData);
  }
};