import express from "express";
import { User } from "../models/User";

export var router = express.Router();

router.get("/api/profile", async (req, res) => {
  var profile = await User.find().lean();
  console.log(profile);
  res.json({ profile });
});

router.post("/api/profile", async (req, res) => {
  var { email, name, nickname } = req.body;

  let profile = await User.findOne({
    $or: [{ email }, { nickname }],
  }).exec();

  if (!profile) {
    profile = await User.create({ name, email, nickname });
  }

  res.json(profile);
});
