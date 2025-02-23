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
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};


// get specific player
export const showPlayer = async(req, res) => {
    try {
        const result = await getPlayerByName(req.params.p_name);

        if (!result) {
            return res.status(404).json({ success: false, data: "Player not found" });
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};


// log in player
export const logInPlayer = async(req, res) => {
    try {
        const { p_name, p_password } = req.body;

        const result = await authenticatePlayer(p_name, p_password);

        if (!result) {
            return res.status(404).json({ success: false, data: "Could not log in" });
        }

        console.log(result);
        res.data = {p_id: result.p_id};

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log("logInPlayer() err: playerController.js");
        res.status(500).send({ success: false, data: error });
    }
};


// create new player
export const createPlayer = async (req, res) => {
    try {
        const { p_name, p_password } = req.body;

        // validation (maybe add more checks later)
        if (!p_name || !p_password) {
            return res.status(400).json({ success: false, data: "Player name and password are required" });
        }

        const result = await insertPlayer({ p_name, p_password });

        // 201 status is used for succesful resource creation
        res.status(201).json({ success: true, p_id: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};


// update player 
export const updatePlayer = async(req, res) => {
    try {
        const { p_name, p_password } = req.body
        const id = req.params.id

        // validation (maybe add more checks later)
        if (!p_name || !p_password) {
            return res.status(400).json({ success: false, data: "Player name and password are required" });
        }

        const result = await updatePlayerById(id, { p_name, p_password })

        // no rows affected means nothing was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, data: "Player not found" });
        }

        res.json({ success: true, data: "Player updated successfully" });
    } catch (error) {
        res.status(500).send({ success: false, data: error });
    }
};


// delete player
export const deletePlayer = async(req, res) => {
    try {
        console.log(req);
        const { p_name, p_password } = req.body;
        const result = await deletePlayerCredentials(p_name, p_password);

        if (result.affectedRows == 0) {
            return res.status(404).json({ success: false, data: "Player not found" });
        }

        res.json({ success: true, data: "Player deleted successfully" });
    } catch (error) {
        res.status(500).send({ success: false, data: error });
    }
};