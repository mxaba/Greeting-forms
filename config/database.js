const pg = require('pg');

const PGUSER = 'mxaba';
const PGDATABASE = 'greet';
const PGPASSWORD = 'mxaba123';

let sslConnection = false;
if (process.env.DATABASE_URL && !(process.env.LOCAL_ENV || false)) {
  sslConnection = true;
}

// connecting
// const dataBasrUrl = process.env.DATABASE_URL || 'postgresql://postgres:greet12345@localhost:5432/greet';
// const dataBasrUrl = process.env.DATABASE_URL || 'postgresql://localhost:5432/greet';

const config = {
  host: '127.0.0.1',
  port: 5432,
  password: PGPASSWORD,
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
  ssl: sslConnection,
};

const pool = new pg.Pool(process.env.DATABASE_URL || config);

module.exports = pool;
