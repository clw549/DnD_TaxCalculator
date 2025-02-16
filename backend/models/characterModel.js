import db from "../config/database.js";


// query all characters
export const getCharacters = async () => {
    try {
        const [result] = await db.query("SELECT * FROM Playable_character");
        return result;
    } catch (error) {
        throw new Error(`Failed to get characters: ${error.message}`);
    }
};


// query specific character
export const getCharacterByNameId = async (c_name, player_id) => {
    try {
        const [result] = await db.query(
            "SELECT * FROM Playable_character WHERE c_name = ? AND player_id = ?", 
            [c_name, player_id]
        );
        return result.length ? result[0] : null; 
    } catch (error) {
        throw new Error(`Failed to get character: ${error.message}`);
    }
};


// insert character into db
export const insertCharacter = async (data) => {
    try {
        const { c_name, player_id, gold, silver, copper, married } = data;
        const [result] = await db.query(
            "INSERT INTO Playable_character (c_name, player_id, gold, silver, copper, married) VALUES (?, ?, ?, ?, ?, ?)",
            [c_name, player_id, gold, silver, copper, married]
        );
        return result;
    } catch (error) {
        throw new Error(`Failed to insert character: ${error.message}`);
    }
};


// update character
export const updateCharacterByNameId = async (c_name, player_id, data) => {
    try {
        const { gold, silver, copper, married } = data;
        const [result] = await db.query(
            "UPDATE Playable_character SET gold = ?, silver = ?, copper = ?, married = ? WHERE c_name = ? AND player_id = ?", 
            [gold, silver, copper, married, c_name, player_id]
        );
        return result.affectedRows > 0; 
    } catch (error) {
        throw new Error(`Failed to update character ${c_name} for player ${player_id}: ${error.message}`);
    }
};


// delete character
export const deleteCharacterByNameId = async (c_name, player_id) => {
    try {
        const [result] = await db.query(
            "DELETE FROM Playable_character WHERE c_name = ? AND player_id = ?", 
            [c_name, player_id]
        );
        return result.affectedRows > 0; 
    } catch (error) {
        throw new Error(`Failed to delete character ${c_name} for player ${player_id}: ${error.message}`);
    }
};