const pg = require('pg');
const pwd = "FKnjpgvyM4s-jNNU226KBSiPcIKYlQas"

const conString = `postgres://ogrcryax:${pwd}@lucky.db.elephantsql.com/ogrcryax`
const client = new pg.Client(conString);

module.exports = client;