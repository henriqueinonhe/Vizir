import express from "express";
import DialCodesPriceRateService from "../Services/DialCodesPriceRateService";
import DatabaseService from "../Services/DatabaseService";

const router = express.Router();

router.get("/", async (_, res) =>
{
  try
  {
    const client = await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
    const database = client.db(DatabaseService.telzirDatabaseName);
    res.send(await DialCodesPriceRateService.getPriceRateTableData(database));
  }
  catch(error)
  {
    console.error(error);
    res.status(500).send({error});
  }
});

export default router;