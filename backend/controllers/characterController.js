import {
    getCharacters,
    getCharacterByNameId,
    insertCharacter,
    updateCharacterByNameId,
    deleteCharacterByNameId,
    showCharacters
} from "../models/characterModel.js";


// This file is used to call all the methods from characterModel.js


// get all characters
export const showCharacters = async (req, res) => {
    try {
        console.log("showing characters");
        console.log(req.body);
        const result = await getCharacters(req.body.player_id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// get specific character
export const showCharacter = async (req, res) => {
    try {
        const { c_name, player_id } = req.params;

        const result = await getCharacterById(c_name, player_id);

        if (!result) {
            return res.status(404).json({ message: "Character not found" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// create new character
export const createCharacter = async (req, res) => {
    try {
        const { c_name, player_id, gold, silver, copper, married } = req.body;

        if (!c_name || !player_id) {
            return res.status(400).json({ error: "Character name and player ID are required" });
        }

        const result = await insertCharacter({ c_name, player_id, gold, silver, copper, married });

        res.status(201).json({
            message: "Character created successfully",
            insertedId: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// update character 
export const updateCharacter = async (req, res) => {
    try {
        const { c_name, player_id } = req.params;
        const { gold, silver, copper, married } = req.body;

        if (!gold && !silver && !copper && married === undefined) {
            return res.status(400).json({ error: "At least one field to update is required" });
        }

        const result = await updateCharacterById(c_name, player_id, { gold, silver, copper, married });

        if (!result) {
            return res.status(404).json({ error: "Character not found" });
        }

        res.json({ message: "Character updated successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// delete character
export const deleteCharacter = async (req, res) => {
    try {
        const { c_name, player_id } = req.params;

        const result = await deleteCharacterById(c_name, player_id);

        if (!result) {
            return res.status(404).json({ message: "Character not found" });
        }

        res.json({ message: "Character deleted successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};