const autoBind = require("auto-bind");

//>---------------------- module export
module.exports = class middleware {
    constructor() {
        autoBind(this);

    }
}