import express from "express";
import { addUserSimulator, getAllSimulatorItems } from "../controllers/SimulatorController";
import { validateRequest } from "../middlewares";
import jwtTokenAuth from "../middlewares/JwtTokenAuth";
import { addSimulator } from "../validation-schema/simulator";

export var router = express.Router();

router.get("/", jwtTokenAuth , getAllSimulatorItems);

router.post("/add",jwtTokenAuth,  validateRequest(addSimulator) , addUserSimulator);
