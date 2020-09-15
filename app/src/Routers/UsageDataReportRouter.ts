import express from "express";
import UsageDataReportService from "../Services/UsageDataReportService";

const router = express.Router();

router.post("/", async (req, res) =>
{
  const clientIp = req.ip;
  const { fromDialCode, toDialCode, dialLength, faleMaisPlan } = req.body;

  try
  {
    await UsageDataReportService.storeUsageData(clientIp, fromDialCode, toDialCode, dialLength, faleMaisPlan);
    res.status(201).send({fromDialCode, toDialCode, dialLength, faleMaisPlan});
  }
  catch(error)
  {
    res.status(500).send({error});
  }
});

export default router;