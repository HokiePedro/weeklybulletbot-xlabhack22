import pg from 'pg';
const pool = new pg.Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

export async function executeQuery(query) {
    const client = await pool.connect();

    return client.query(query) // your query string here
        .then(result => result) // your callback here
        .catch(e => handleError(e.stack)) // your callback here
        .finally(() => client.release())
}

function handleError(stack) {
    console.error(stack);
}