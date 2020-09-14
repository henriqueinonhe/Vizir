import dotenv from "dotenv";
import express from "express";
import DatabaseService from "./Services/DatabaseService";
import DialCodesPriceRateRoute from "./Routes/DialCodesPriceRateRoute";
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
  expressApp.use("/dialCodesPriceRate", DialCodesPriceRateRoute);

  expressApp.listen(3000 || process.env.PORT, () =>
  {
    console.log("Server up!");
  });
}

main();
