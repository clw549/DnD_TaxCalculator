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

db.getConnection()
    .then(connection => {
        console.log("Database Connected");
        connection.release();
    })
    .catch(err => {
        console.error("Database Connection Failed", err);
    });

export default db;