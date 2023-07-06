const path = require("path");
const expressLayouts = require('express-ejs-layouts');

module.exports = {
    public_drc: 'public',
    view_drc: path.resolve('./resource/views'),
    view_engin: 'ejs',
    ejs: {
        expressLayouts,
        master: "home/index",
        expressScripts: true,
        expressStyles: true,
    }
}