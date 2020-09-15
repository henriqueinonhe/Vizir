import dotenv from "dotenv";
import express from "express";
import DatabaseService from "./Services/DatabaseService";
import DialCodesPriceRateRouter from "./Routers/DialCodesPriceRateRouter";
import UsageDataReportRouter from "./Routers/UsageDataReportRouter";
import compression from "compression";

async function main() : Promise<void>
{
  //Initialization
  dotenv.config();
  try
  {
    await DatabaseService.getTelzirDatabase(process.env.DB_URI!);
  }
  catch(error)
  {
    console.error(error);
  }

  const expressApp = express();
  expressApp.use(express.static("public"));
  expressApp.use(express.json());
  expressApp.use(compression());
  expressApp.use("/dialCodesPriceRate", DialCodesPriceRateRouter);
  expressApp.use("/usageData", UsageDataReportRouter);
  expressApp.listen(process.env.PORT || 3000, () =>
  {
    console.log("Server up!");
  });
}

main();
