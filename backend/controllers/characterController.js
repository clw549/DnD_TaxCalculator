import {
    getCharacters,
    getCharacterByNameId,
    insertCharacter,
    updateCharacterByNameId,
    deleteCharacterByNameId,
} from "../models/characterModel.js";


// This file is used to call all the methods from characterModel.js

// get all characters
export const displayCharacters = async (req, res) => {
    try {
        const { p_id } = req.body;
        console.log(req);
        const result = await getCharacters(p_id);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};


// get specific character
export const showCharacter = async (req, res) => {
    try {
        const { c_name, player_id } = req.params;

        const result = await getCharacterById(c_name, player_id);

        if (!result) {
            return res.status(404).json({ success: false, data: "Character not found" });
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};

// create new character
export const createCharacter = async (req, res) => {
    try {
        const { name, p_id, gold, silver, copper, married } = req.body;
        

        if (!name || !p_id) {
            return res.status(400).json({ success: false, data: "Character name and player ID are required" });
        }

        const result = await insertCharacter({ name, p_id, gold, silver, copper, married });

        res.status(201).json({ success: true, insertedId: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};


// update character 
export const updateCharacter = async (req, res) => {
    try {
        const { c_name, player_id } = req.params;
        const { gold, silver, copper, married } = req.body;

        if (!gold && !silver && !copper && married === undefined) {
            return res.status(400).json({ success: false, data: "At least one field to update is required" });
        }

        const result = await updateCharacterById(c_name, player_id, { gold, silver, copper, married });

        if (!result) {
            return res.status(404).json({ success: false, data: "Character not found" });
        }

        res.status(200).json({ success: true, data: "Character updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};


// delete character
export const deleteCharacter = async (req, res) => {
    try {
        const { c_name, player_id } = req.params;

        const result = await deleteCharacterById(c_name, player_id);

        if (!result) {
            return res.status(404).json({ success: false, data: "Character not found" });
        }

        res.status(200).json({ success: true, data: "Character deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};