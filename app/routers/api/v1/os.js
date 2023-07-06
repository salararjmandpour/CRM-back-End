const express = require("express");
const requestIp = require("request-ip");
const router = express.Router();
const Sniffr = require("sniffr");

router.get("/", (req, res) => {
  const userAgent = req.headers["user-agent"];
  const s = new Sniffr();
  s.sniff(userAgent);

  const clientIp = requestIp.getClientIp(req);

  res.json({ ip: clientIp, os: s.os.name, browser: s.browser.name });
  return res.status(200);
});

module.exports = router;
