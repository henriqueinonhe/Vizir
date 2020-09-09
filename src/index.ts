import dotenv from "dotenv";
import express from "express";

async function main() : Promise<void>
{
  //Initialization
  dotenv.config();

  const expressApp = express();
  expressApp.use(express.static("public"));
  expressApp.use(express.json());


  //Logic
  expressApp.listen(3000 || process.env.PORT, () =>
  {
    console.log("Server up!");
  });
}

main();
