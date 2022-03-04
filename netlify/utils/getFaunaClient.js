const { Client } = require('faunadb')
require('dotenv').config()

module.exports = function getFaunaClient() {
  return new Client({
    secret: process.env.FAUNA_SECRET,
    domain: "db.us.fauna.com",
  });
}