import fs from 'fs'
import { createPool } from 'mysql2/promise'

const developmentConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat-translate',
    port: 3306
}

const productionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {ca:fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
}

export const pool = createPool(productionConfig)