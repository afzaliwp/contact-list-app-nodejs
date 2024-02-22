import pgPkg from 'pg';
const { Pool } = pgPkg;

const pool = new Pool({
    host: 'localhost',
    port: 54321,
    username: 'ma90',
    database: 'contacts',
});

export const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}