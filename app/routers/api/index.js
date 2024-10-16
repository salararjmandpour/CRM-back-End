const express = require("express");
const app = express();
const router = express.Router();

//!>-------------------- public route

const authRouter = require("./v1/auth");
router.use("/api/v1/auth", authRouter);

const logoutRouter = require("./v1/logout");
router.use("/api/v1/logout", logoutRouter);

const refreshRouter = require("./v1/refresh");
router.use("/api/v1/refresh", refreshRouter);

const registerRouter = require("./v1/register");
router.use("/api/v1/register", registerRouter);

const osRouter = require("./v1/os");
router.use("/api/v1/os", osRouter);

const statesRouter = require("./v1/states");
router.use("/api/v1/states", statesRouter);

const citiesRouter = require("./v1/cities");
router.use("/api/v1/cities", citiesRouter);

const timeZonesRouter = require("./v1/timeZones");
router.use("/api/v1/timeZones", timeZonesRouter);

const getUniRouter = require("./v1/getUni");
router.use("/api/v1/getallUni", getUniRouter);

const phoneCodeRouter = require("./v1/phoneCode");
router.use("/api/v1/phoneCode", phoneCodeRouter);

const customerRouter = require("./v1/customer");
router.use("/api/v1/customer", customerRouter);

//!>---------- protected routes

const usersRouter = require("./v1/users");
router.use("/api/v1/users", usersRouter);

const createSideRouter = require("./v1/createSide");
router.use("/api/v1/createSide", createSideRouter);

const accessLevelRouter = require("./v1/accessLevel");
router.use("/api/v1/accessLevel", accessLevelRouter);

const rolesRouter = require("./v1/roles");
router.use("/api/v1/roles", rolesRouter);

const userRouter = require("./v1/profile");
router.use("/api/v1/profile", userRouter);

const clueRouter = require("./v1/clue");
router.use("/api/v1/clue", clueRouter);

const accountRouter = require("./v1/account");
router.use("/api/v1/account", accountRouter);

const clueToSaleRouter = require("./v1/sale");
router.use("/api/v1/clueToSale", clueToSaleRouter);

const saleRouter = require("./v1/sale");
router.use("/api/v1/sale", saleRouter);

const campaignRouter = require("./v1/campaign");
router.use("/api/v1/campaign", campaignRouter);

const dashboardRouter = require("./v1/dashboard");
router.use("/api/v1/dashboard", dashboardRouter);

const mailRouter = require("./v1/mail");
router.use("/api/v1/mail", mailRouter);

const smsRouter = require("./v1/sms");
router.use("/api/v1/sms", smsRouter);

const xlsxRouter = require("./v1/xlsx");
router.use("/api/v1/xlsx", xlsxRouter);

const notificationsRouter = require("./v1/notifications");
router.use("/api/v1/notifications", notificationsRouter);

const contactRouter = require("./v1/contacts");
router.use("/api/v1/contacts", contactRouter);

const searchRouter = require("./v1/search");
router.use("/api/v1/search", searchRouter);

//*>---------- not found route

app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "صفحه مورد نظر یافت نشد ):",
  });
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use((err, req, res) => {
  res.sendStatus(500).send(err.message);
});

//*>---------------------- module export

module.exports = router;
