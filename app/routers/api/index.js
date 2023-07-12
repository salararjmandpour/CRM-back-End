const express = require("express");
const app = express();
const router = express.Router();

//>-------------------- middleware

//>-------------------- public route

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

const testRouter = require("./v1/test");
router.use("/api/v1/test", testRouter);

//>---------- protected routes

const usersRouter = require("./v1/users");
router.use("/api/v1/users", usersRouter);

const rolesRouter = require("./v1/roles");
router.use("/api/v1/roles", rolesRouter);

const userRouter = require("./v1/profile");
router.use("/api/v1/profile", userRouter);

const clueRouter = require("./v1/clue");
router.use("/api/v1/clue", clueRouter);

const campaignRouter = require("./v1/campaign");
router.use("/api/v1/campaign", campaignRouter);

const mailRouter = require("./v1/mail");
router.use("/api/v1/mail", mailRouter);

const smsRouter = require("./v1/sms");
router.use("/api/v1/sms", smsRouter);

//>---------- not found route

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

//>---------------------- module export

module.exports = router;
