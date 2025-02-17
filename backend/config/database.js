import mysql from "mysql2/promise";

const db = mysql.createPool({
    user: "root",
    password: "",
    host: "localhost",
    database: "DND_TAX_DB",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,  // Allows multiple queries
    queueLimit: 0
});

export default db;