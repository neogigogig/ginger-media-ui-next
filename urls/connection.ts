const connection = {
    host: process.env.DB_ENDPOINT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 3306,
}

export const config = {
    client: 'mysql2',
    connection,
}