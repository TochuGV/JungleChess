import sql from "mssql";
import "dotenv/config"

if (!process.env.DB_USER
    || !process.env.DB_PASSWORD
    || !process.env.DB_SERVER
    || !process.env.DB_DATABASE) {
    throw new Error("La DB necesita configurarse en el .env");
}

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

export default config;
