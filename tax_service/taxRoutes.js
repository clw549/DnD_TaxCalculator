const express = require("express");
const fs = require("fs");
const cors = require("cors");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

const router = express.Router();

const PORT = 5003;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

async function initializeDatabase() {
    try {

        console.log('Connected to MySQL. Initializing database...');

        const sql = fs.readFileSync('tax_db.sql', 'utf8');
        db.run(sql);

        console.log('Tax database initialized successfully.');
        // db.close();
    } catch (error) {
        console.error('Error initializing tax database:', error);
    }
}

initializeDatabase();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started at port ${PORT}`)
});

// query functions

// sanitizes input
function sanitize(input) {
    return input.replace(/['"]/g, ""); 
}

function displayTax(req, res) {
    try {
        const { tax_id } = req.body;

        // SQLite3 query using db.all for multiple rows
        db.all("SELECT * FROM Tax", [], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get Tax: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send(`Failed to get Tax: ${error.message}`);
    }
}

function createTaxLocation(req, res) {
    try {
        const { tax_id, tax_amount, tax_location } = req.body;
        const sql = "INSERT INTO Tax (tax_id, tax_amount, tax_location) VALUES (?, ?, ?)";
        if (!tax_location) {
            return res.status(400).json({ error: "Location is required" });
        }
        db.run(sql, [tax_id, tax_amount, tax_location ], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get Tax: ${err.message}`);
            }
            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });

        res.status(201).json({
            message: "Tax amount created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to insert tax location: ${error.message}` });
    }
};

function updateTax(req, res) {
    try {
        const { tax_id } = req.params;
        const { tax_amount, tax_location } = req.body;

        if (!tax_id && !tax_location) {
            return res.status(400).json({ error: "At least one field to update is required" });
        }

        const [result] = db.run(
            "UPDATE Tax SET tax_amount = ?, tax_location = ? WHERE id = ?",
            [sanitize(tax_amount), sanitize(tax_location), tax_id]
        );

        if (!result.affectedRows > 0) {
            return res.status(404).json({ error: "Tax location not found" });
        }

        res.json({ message: "Tax amount updated successfully" });
    } catch (error) {
        res.status(500).send(`Failed to update tax amount ${tax_id}: ${error.message}`);
    }
};

function deleteTaxLocation(req, res) {
    try {
        console.log(req.body);
        const { tax_id } = req.body;
        console.log(`${tax_id}`);
        const sql = "DELETE FROM Tax WHERE tax_id = ?";

        db.run(sql, [tax_id], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get tax location: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });

        res.json({ message: "Tax location deleted successfully" });
    } catch (error) {
        res.status(500).send(`Failed to delete tax location ${tax_id}: ${error.message}`);
    }
};

router.get("/api/tax", displayTax);
router.post("/api/tax", createTaxLocation);
router.patch("/api/tax", updateTax);
router.delete("/api/tax", deleteTaxLocation);    
