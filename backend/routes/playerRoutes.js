import express from "express";
import {
    showPlayers,
    showPlayer,
    logInPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer
} from "../controllers/playerController.js";

const router = express.Router();


router.get("/players", showPlayers);
router.get("/players/:name", showPlayer);
router.post("/players/login", logInPlayer);
router.post("/players", createPlayer);
router.patch("/players/:id", updatePlayer);
router.post("/players/delete", deletePlayer);


export default router