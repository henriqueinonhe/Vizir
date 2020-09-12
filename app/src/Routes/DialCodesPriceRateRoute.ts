import express from "express";
import DialCodesPriceRateService from "../Services/DialCodesPriceRateService";

const router = express.Router();

router.get("/", async (req, res) =>
{
  try
  {
    res.send(await DialCodesPriceRateService.getPriceRateTableData());
  }
  catch(error)
  {
    console.log(error);
    res.status(500).send({error});
  }
});

export default router;