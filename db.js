const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "0927",
    host: "localhost",
    database: "ricebill",
    port: 5432
})

module.exports = pool;