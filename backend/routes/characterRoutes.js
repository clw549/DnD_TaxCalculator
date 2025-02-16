import express from "express";
import {
    showCharacters,
    showCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
} from "../controllers/characterController.js";

const router = express.Router();


router.get("/characters", showCharacters);
router.get("/characters/:c_name/:player_id", showCharacter);
router.post("/characters", createCharacter);
router.patch("/characters/:c_name/:player_id", updateCharacter);
router.delete("/characters/:c_name/:player_id", deleteCharacter);


export default router