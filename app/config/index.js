
const database = require('./database');
const layout = require('./layout');
module.exports = {
  database,
  layout,
  port: 3005,
  encryptionKey: process.env.ENCRYPTION_KEY,
  encryptionIv: process.env.ENCRYPTION_IV,
  cookie_secretkey: process.env.COOKIE_SECRETKEY,
};