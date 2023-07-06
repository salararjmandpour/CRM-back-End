const autoBind = require("auto-bind");

//>---------------------- module export
module.exports = class validator {
    constructor() {
        autoBind(this);

    }
}