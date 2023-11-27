const express = require("express");
const session = require("express-session");
const app = express();
const chalk = require("chalk");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = require("app/config/corsOptions");
const credentials = require("app/http/middleware/credential");
const ExpressBrute = require("express-brute");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const xss = require("xss-clean");
const path = require("path");
const jsPDF = require("jspdf");


//*>----------------------module export

module.exports = class Application {
  constructor() {
    this.setConfig(); //!set config project
    this.setSecurity(); //!set config security [project]
    this.setMongoConnection(); //!set mongoDB connection
    this.setupExpress(); //!set setup express.JS
    this.setConfigMorgan(); //!set config PG morgan
    this.setRouter(); //!set router app
  }

  //*>-------------------- method setup express

  setupExpress() {
    app.listen(config.port, () => {
      console.log(chalk.bgCyan(`Listening on port ${config.port}`));
      console.log(chalk.bgGray("server UTC:", new Date()));
      console.log(
        chalk.bgGreen(
          new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })
        )
      );

    });
  }

  //*>---------------------- set mongoDB connection

  setMongoConnection() {
    mongoose.connect(config.database.url);
  }

  //*>---------------------- set router app

  setRouter() {

    
    //*>---------------------- set express brute
    const store = new ExpressBrute.MemoryStore(); //!stores state locally, don't use this in production
    const bruteForce = new ExpressBrute(store);

    app.use(require("app/routers/api", bruteForce.prevent));
    app.use(require("app/routers/web", bruteForce.prevent));
  }

  //*>---------------------- set config PG morgan

  setConfigMorgan() {
    const log = (req, res, next) => {
      console.log(chalk.bgBlue("Logging routes" + req.originalUrl));
      next();
    };
    app.use(log);
    app.use(morgan("dev"));
  }

  //*>---------------------- method set config security

  setSecurity() {
    const limiter = rateLimit({
      windowMs: 250 * 60 * 1000,
      max: 500,
    });
    //?.........................//
    app.use(hpp());
    app.use(limiter);
    app.use(xss());
    app.use(credentials);
    app.use(helmet({ contentSecurityPolicy: false, xDownloadOptions: false }));
    app.use(
      session({
        secret: "2906SA0208!@",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, path: "/" },
      })
    );
    app.use(cors(corsOptions));
  }

  //*>---------------------- method set config express

  setConfig() {
    app.use(express.json());
    app.use(express.static(config.layout.public_drc)); //!set static file in folder public(example image,...)
    app.use("/upload", express.static("upload"));
    app.set("view engine", config.layout.view_engin); //!template engine install ejs
    app.set("views", config.layout.view_drc); //!set view file in folder views
    app.use(config.layout.ejs.expressLayouts); //!set master page layouts
    app.set("layout extractScripts", config.layout.ejs.expressScripts);
    app.set("layout extractStyles", config.layout.ejs.expressStyles);
    app.set("layout", config.layout.ejs.master); //!set page layout

    app.use(bodyParser.json()); //!adjust the bodyParser
    app.use(bodyParser.urlencoded({ extended: true })); //!set urlencoded : true
    // app.use(validator()); //!set middleware of validator
    app.use(cookieParser(config.cookieSecretKey)); //!set middleware of cookieParser
  }
};
