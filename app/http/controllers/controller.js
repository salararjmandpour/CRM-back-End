const chalk = require("chalk");
const autoBind = require("auto-bind");

//*>---------------------- module export
module.exports = class controller {
  constructor() {
    autoBind(this);
    this.createDate();
  }

  //*>---------------------- create Date of os
  createDate() {
    const date = new Date();
    const option = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    let totalDate = date.toLocaleDateString("fa-IR", option);
    return totalDate;
  }
};
