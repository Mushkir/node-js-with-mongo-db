import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  const users = ["Mushkir", "Moahmed", "Sayas"];

  return res.json({ users: users });
});

userRouter.get("/newGet", (req, res) => {
  return res.json({ messag: "New Get Method Testing" });
});

export default userRouter;
