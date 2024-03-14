import pgPkg from 'pg';
const { Pool } = pgPkg;
import * as sequelize from "./sequelize.js";

console.log(sequelize)

// server running command:
// pg_ctl -D ~/PostgreSQL/postgresql@16 -o "-p 54321" -l logfile start
// psql -h localhost -p 54321 -U ma90 -d contacts
const pool = new Pool({
    host: 'localhost',
    port: 54321,
    username: 'ma90',
    database: 'contacts',
});

export const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}