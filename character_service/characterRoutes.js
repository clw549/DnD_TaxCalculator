const express = require("express");
const fs = require("fs");
const cors = require("cors");

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("database.db");

const router = express.Router();

const PORT = 5002;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);


async function initializeDatabase() {
    try {

        console.log('Connected to MySQL. Initializing database...');

        const sql = fs.readFileSync('character_db.sql', 'utf8');
        db.run(sql);

        console.log('Character database initialized successfully.');
        // db.close();
    } catch (error) {
        console.error('Error initializing character database:', error);
    }
}

initializeDatabase();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started at port ${PORT}`)
});

// query functions

//sanitizes input
function sanitize(input) {
    return input.replace(/['"]/g, ""); // Removes SQL-breaking characters
}

function displayCharacters(req, res) {
    try {
        const { p_id } = req.body;
        console.log(req);

        // SQLite3 query using db.all for multiple rows
        db.all("SELECT * FROM Playable_character", [], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get characters: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send(`Failed to get characters: ${error.message}`);
    }
}


// create new character
function createCharacter(req, res) {
    try {
        const { name, p_id, gold, silver, copper, married } = req.body;
        const sql = "INSERT INTO Playable_character (c_name, player_id, gold, silver, copper, married) VALUES (?, ?, ?, ?, ?, ?)";

        if (!name || !p_id) {
            return res.status(400).json({ error: "Character name and player ID are required" });
        }

        db.run(sql, [name, p_id, gold, silver, copper, married], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get characters: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });

        res.status(201).json({
            message: "Character created successfully"
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to insert character: ${error.message}` });
    }
};


// update character 
function updateCharacter(req, res) {
    try {
        const { c_id } = req.params;
        const { gold, silver, copper, married } = req.body;

        if (!gold && !silver && !copper && married === undefined) {
            return res.status(400).json({ error: "At least one field to update is required" });
        }

        const [result] = db.run(
            "UPDATE Playable_character SET gold = ?, silver = ?, copper = ?, married = ? WHERE id = ?",
            [gold, silver, copper, married, sanitize(c_id)]
        );

        if (!result.affectedRows > 0) {
            return res.status(404).json({ error: "Character not found" });
        }

        res.json({ message: "Character updated successfully" });
    } catch (error) {
        res.status(500).send(`Failed to update character ${c_name} for player ${player_id}: ${error.message}`);
    }
};


// delete character
function deleteCharacter(req, res) {
    try {
        console.log(req.body);
        const { c_name, p_id } = req.body;
        console.log(`${c_name}, ${p_id}`);
        const sql = "DELETE FROM Playable_character WHERE player_id = ? AND c_name = ?";

        db.run(sql, [p_id, c_name], (err, rows) => {
            if (err) {
                console.error("Error querying database:", err.message);
                return res.status(500).send(`Failed to get characters: ${err.message}`);
            }

            // If the query was successful, send the rows as a JSON response
            res.json(rows);
        });

        res.json({ message: "Character deleted successfully" });
    } catch (error) {
        res.status(500).send(`Failed to delete character ${c_name} for player ${player_id}: ${error.message}`);
    }
};

router.get("/api/characters", displayCharacters);
router.post("/api/characters", createCharacter);
router.patch("/api/characters", updateCharacter);
router.delete("/api/characters", deleteCharacter);    