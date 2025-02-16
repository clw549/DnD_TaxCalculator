import mysql from "mysql2";

const db = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    database: "DND_TAX_DB",
    port: 3306
});

export default db;