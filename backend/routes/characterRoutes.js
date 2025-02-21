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
router.post("/characters", createCharacter);
router.patch("/characters/:c_name/", updateCharacter);
router.delete("/characters/:c_name/", deleteCharacter);


export default router