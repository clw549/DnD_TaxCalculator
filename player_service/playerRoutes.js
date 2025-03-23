const express = require("express");
const fs = require("fs");
const cors = require("cors");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

const router = express.Router();

const PORT = 5001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


async function initializeDatabase() {
    try {

        console.log('Connected to MySQL. Initializing database...');

        const sql = fs.readFileSync('player_db.sql', 'utf8');
        db.run(sql);

        console.log('Player database initialized successfully.');
        // db.close();
    } catch (error) {
        console.error('Error initializing player database:', error);
    }
}

initializeDatabase();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started at port ${PORT}`)
});

// query functions

// sanitizes input
function sanitize(input) {
    return input.replace(/['"]/g, ""); // Removes SQL-breaking characters
}

function displayPlayers(req, res) {
    try {
        const { p_id } = req.body;
        console.log(req);

        // SQLite3 query using db.all for multiple rows
        db.all("SELECT * FROM Player", [], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get players: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send(`Failed to get players: ${error.message}`);
    }
}


// create new player
function createPlayer(req, res) {
    try {
        const { p_name, p_password } = req.body;
        const sql = "INSERT INTO Player (p_name, p_password) VALUES (?, ?)";

        if (!p_name || !p_password) {
            return res.status(400).json({ error: "Player name and password are required" });
        }

        db.run(sql, [p_name, p_password], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get player: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });

        res.status(201).json({
            message: "Player created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to insert player: ${error.message}` });
    }
};


function updatePlayer(req, res) {
    try {
        const { p_id } = req.params;
        const { p_name, p_password } = req.body;

        if (!p_name && !p_password) {
            return res.status(400).json({ error: "At least one field to update is required" });
        }

        const [result] = db.run(
            "UPDATE Player SET p_name = ?, p_password = ? WHERE id = ?",
            [sanitize(p_name), sanitize(p_password), p_id]
        );

        if (!result.affectedRows > 0) {
            return res.status(404).json({ error: "Player not found" });
        }

        res.json({ message: "Player updated successfully" });
    } catch (error) {
        res.status(500).send(`Failed to update player ${player_id}: ${error.message}`);
    }
};


// delete player
function deletePlayer(req, res) {
    try {
        console.log(req.body);
        const { p_id } = req.body;
        console.log(`${p_id}`);
        const sql = "DELETE FROM Player WHERE player_id = ?";

        db.run(sql, [p_id], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get player: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });

        res.json({ message: "Player deleted successfully" });
    } catch (error) {
        res.status(500).send(`Failed to delete player ${player_id}: ${error.message}`);
    }
};

router.get("/api/players", displayPlayers);
router.post("/api/players", createPlayer);
router.patch("/api/players", updatePlayer);
router.delete("/api/players", deletePlayer);    