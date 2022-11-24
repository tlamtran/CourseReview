const pg = require('pg');

const conString = `postgres://yvduzbdu:${process.env.PWD}@mouse.db.elephantsql.com/yvduzbdu`
const client = new pg.Client(conString);

module.exports = client;