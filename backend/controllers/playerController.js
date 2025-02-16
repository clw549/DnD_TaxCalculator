import {
    getPlayers,
    getPlayerById,
    insertPlayer,
    updatePlayerById,
    deletePlayerById
} from "../models/playerModel.js";


// This file is used to call all the methods from playerModel.js


// get all players
export const showPlayers = async (req, res) => {
    try {
        const result = await getPlayers();
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// get specific player
export const showPlayer = async(req, res) => {
    try {
        const result = await getPlayerById(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// create new player
export const createPlayer = async (req, res) => {
    try {
        const { p_name, p_password } = req.body;

        // validation (maybe add more checks later)
        if (!p_name || !p_password) {
            return res.status(400).json({ error: "Player name and password are required" });
        }

        const result = await insertPlayer({ p_name, p_password });

        // 201 status is used for succesful resource creation
        res.status(201).json({
            message: "Player created successfully",
            p_id: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// update player 
export const updatePlayer = async(req, res) => {
    try {
        const { p_name, p_password } = req.body
        const id = req.params.id

        // validation (maybe add more checks later)
        if (!p_name || !p_password) {
            return res.status(400).json({ error: "Player name and password are required" });
        }

        const result = await updatePlayerById(id, { p_name, p_password })

        // no rows affected means nothing was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Player not found" });
        }

        res.json({ message: "Player updated successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// delete player
export const deletePlayer = async(req, res) => {
    try {
        const result = await deletePlayerById(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json({ message: "Player deleted successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};