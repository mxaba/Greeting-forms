const pg = require('pg');

const PGUSER = 'mxaba';
const PGDATABASE = 'greet';
const PGPASSWORD = 'mxaba123';

const config = {
  host: '127.0.0.1',
  port: 5432,
  password: PGPASSWORD,
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
  // ssl: sslConnection,
};

const dataBasrUrl = process.env.DATABASE_URL || config;

const pool = new pg.Pool({
  connectionString: dataBasrUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new pg.Pool(dataBasrUrl);

module.exports = pool;
