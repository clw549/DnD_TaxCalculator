import express from "express";
import {
    showPlayers,
    showPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer
} from "../controllers/playerController.js";

const router = express.Router();


router.get("/players", showPlayers);
router.get("/players/:id", showPlayer);
router.post("/players", createPlayer);
router.patch("/players/:id", updatePlayer);
router.delete("/players/:id", deletePlayer);


export default router