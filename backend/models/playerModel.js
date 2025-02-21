import db from "../config/database.js";


// query all players
export const getPlayers = async () => {
    try {
        const [result] = await db.query("SELECT * FROM Player");
        return result;
    } catch (error) {
        throw new Error(`Failed to get players: ${error.message}`);
    }
};


// query specific player
export const getPlayerByName = async(name) => {
    try {
        const [result] = await db.query("SELECT * FROM Player WHERE p_name = ?", [name]);
        return result.length ? result[0] : null; 
    } catch (error) {
        throw new Error(`Failed to get player: ${error.message}`);
    }
}


// log in player
export const authenticatePlayer = async(name, password) => {
    try {
        const [result] = await db.query("SELECT * FROM Player WHERE p_name = ? AND p_password = ?", [name, password]);
        return result.length ? result[0] : null; 
    } catch (error) {
        throw new Error(`Failed to log in: ${error.message}`);
    }
}


// insert player into db
export const insertPlayer = async (data) => {
    try {
        const { p_name, p_password } = data;

        const [result] = await db.query(
            "INSERT INTO Player (p_name, p_password) VALUES (?, ?)", 
            [p_name, p_password]
        );
        return { insertedId: result.insertId };
    } catch (error) {
        throw new Error(`Failed to insert player: ${error.message}`);
    }
};



// update player
export const updatePlayerById = async(id, data) => {
    try {
        const { p_name, p_password } = data;
        const [result] = await db.query("UPDATE Player SET p_name = ?, p_password = ? WHERE p_id = ?", 
                                        [p_name, p_password, id]);
        return result.affectedRows > 0; 
    } catch (error) {
        throw new Error(`Failed to update player ${id}: ${error.message}`);
    }
}


// delete player
export const deletePlayerById = async(id) => {
    try {
        const [result] = await db.query("DELETE FROM Player WHERE p_id = ?", [id]);
        return result.affectedRows > 0; 
    } catch (error) {
        throw new Error(`Failed to delete player ${id}: ${error.message}`);
    }
}

export const deletePlayerCredentials = async(p_name, p_password) => {
    try {
        const [result] = await db.query("DELETE FROM Player WHERE p_name = ? AND p_password = ?", [p_name, p_password]);
        return result;
    } catch (error) {
        throw new Error(`Failed to delete player ${p_name}: ${error.message}`);
    }
}