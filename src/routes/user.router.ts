import express from "express";
import { getUserFavorites } from "../controllers/FavoriteController";
import { getUserSimulators } from "../controllers/SimulatorController";
import { getUserProfile, loginUser, registerUser } from "../controllers/UserController";
import { validateRequest } from "../middlewares";
import jwtTokenAuth from "../middlewares/JwtTokenAuth";
import { userLogin, userRegister } from "../validation-schema/user";

export var router = express.Router();

router.get("/profile", jwtTokenAuth, getUserProfile);

router.post("/login", validateRequest(userLogin) , loginUser);

router.post("/register", validateRequest(userRegister) , registerUser);

router.get("/favorites", jwtTokenAuth, getUserFavorites);

router.get("/simulators", jwtTokenAuth, getUserSimulators);
