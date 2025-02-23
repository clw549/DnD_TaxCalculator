import express from "express";
import {
    showPlayers,
    showPlayer,
    logInPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer
} from "../controllers/playerController.js";

import {
    displayCharacters,
    showCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
} from "../controllers/characterController.js";

const router = express.Router();

router.post("/characters/show", displayCharacters);
router.post("/characters", createCharacter);
router.patch("/characters/:c_name/", updateCharacter);
router.delete("/characters/:c_name/", deleteCharacter);

router.get("/players", showPlayers);
router.get("/players/:name", showPlayer);
router.post("/players/login", logInPlayer);
router.post("/players", createPlayer);
router.patch("/players/:id", updatePlayer);
router.delete("/players/delete", deletePlayer);


export default router