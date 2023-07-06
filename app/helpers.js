const path = require('path');
const autoBind = require("auto-bind");

module.exports = class Helpers {
    
    constructor(req, res) {

        autoBind(this);
        this.req = req;
        this.res = res;

    }


}