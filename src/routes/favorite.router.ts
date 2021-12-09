import express from "express";
import {
  getAllFavoriteItems,
  addUserFavorite,
} from "../controllers/FavoriteController";
import { validateRequest } from "../middlewares";
import jwtTokenAuth from "../middlewares/JwtTokenAuth";
import { addFavorite } from "../validation-schema/favorite";

export const router = express.Router();

router.get("/", jwtTokenAuth, getAllFavoriteItems);

router.post(
  "/add",
  jwtTokenAuth,
  validateRequest(addFavorite),
  addUserFavorite
);
