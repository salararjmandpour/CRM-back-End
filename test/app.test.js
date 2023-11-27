const appModulePath = require("app-module-path");
const path = require("path");

// اضافه کردن مسیرهای مورد نیاز به مسیرهای جستجو
appModulePath.addPath(path.join(__dirname, "..", "path", "to", "your", "app"));

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("app/index");

chai.use(chaiHttp);
const expect = chai.expect;



describe("Application", () => {
  // تست متد setupExpress
  it("should start the server and listen on the specified port", (done) => {
    chai.request(app)
      .get("/") // یک endpoint دلخواه را انتخاب کنید
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // // تست متد setMongoConnection
  // it("should connect to MongoDB", () => {
  //   // احتمالا باید از یک کتابخانه mock MongoDB یا ابزار مشابه برای نوشت تست استفاده کنید.
  // });

  // // تست متد setRouter
  // it("should set up express brute middleware", (done) => {
  //   chai.request(app)
  //     .get("./app/routers/api") // endpoint مربوط به express brute را قرار دهید
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });

  // // تست متد setConfigMorgan
  // it("should set up morgan middleware", (done) => {
  //   chai.request(app)
  //     .get("/") // یک endpoint دلخواه را انتخاب کنید
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });

  // // تست متد setSecurity
  // it("should set up security middleware", (done) => {
  //   chai.request(app)
  //     .get("/") // یک endpoint دلخواه را انتخاب کنید
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });

  // // تست متد setConfig
  // it("should set up express configuration", (done) => {
  //   chai.request(app)
  //     .get("/") // یک endpoint دلخواه را انتخاب کنید
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });
});
