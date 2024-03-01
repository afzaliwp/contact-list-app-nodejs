import pgPkg from 'pg';
const { Pool } = pgPkg;

// server running command:
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