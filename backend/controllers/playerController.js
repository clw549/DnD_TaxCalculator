import {
    getPlayers,
    getPlayerByName,
    insertPlayer,
    updatePlayerById,
    deletePlayerCredentials,
    authenticatePlayer
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
        const result = await getPlayerByName(req.params.p_name);

        if (!result) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// log in player
export const logInPlayer = async(req, res) => {
    try {
        const { p_name, p_password } = req.body;

        const result = await authenticatePlayer(p_name, p_password);

        if (!result) {
            return res.status(404).json({ message: "Could not log in" });
        }

        console.log(result);
        res.data = {p_id: result.p_id};

        res.json(result);
    } catch (error) {
        console.log("logInPlayer() err: playerController.js");
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
        console.log(req);
        const { p_name, p_password } = req.body;
        const result = await deletePlayerCredentials(p_name, p_password);

        if (result.affectedRows == 0) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json({ message: "Player deleted successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};