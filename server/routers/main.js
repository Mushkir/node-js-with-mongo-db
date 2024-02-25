import express from "express";
import userRouter from "./users.js";
import {
  createTutorialRequest,
  deleteDataById,
  getAllRequestData,
  updateDataById,
} from "../models/user-request.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  // res.send("Hello World");
  return res.json({
    success: true,
    message: "Hello enjoy developing web apps!",
  });
});

// Create Operation
router.post("/create", async (req, res) => {
  // Postman API Contents (Body. To access need to isntall body-parser)
  console.log(req.body);
  const dataFromClient = { ...req.body, create_at: Date.now() };

  // * sending the data to DB
  try {
    const creationResult = await createTutorialRequest(dataFromClient);
    console.log("creationResult from main.js: " + creationResult);
  } catch (error) {
    console.log(error);
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }
    res.status(400).json(error.message);
  }

  // console.log(dataFromClient);

  // const data = {
  //   technology: "tooling",
  //   title: "GitHub Tutorials",
  //   create_at: new Date(),
  // };

  return res.json(dataFromClient);
});

// ! Get Operation
router.get("/requests", async (req, res) => {
  const requestData = await getAllRequestData();

  console.log(requestData);

  return res.json(requestData);
});

// ! Update
router.put("/requests/:id", async (req, res) => {
  const docId = req.params.id;
  console.log(req.params.id);

  if (docId) {
    // * Call the Update fucntion
    const updatedResult = await updateDataById(docId, req.body);

    return res.json(updatedResult);
  }

  return res.status(403);
});

// ! Delete
router.delete("/requests/:id", async (req, res) => {
  const docId = req.params.id;

  if (docId) {
    await deleteDataById(docId);
    // const result = await deleteDataById(docId);

    return res.json(true);
  }

  return res.status(403);
});
export default router;

// router.get("/about", (req, res) => {
//   return res.json({ message: "About page here" });
// });

// router.get("/contact", (req, res) => {
//   return res.json({ message: "You are in now contact page" });
// });

// // :director is GET variable.
// router.get("/about/:user", (req, res) => {
//   return res.json({
//     message: `Hello! ${req.params.user} you watching about page GET person page`,
//   });
// });

// router.use("/users", userRouter);
// router.use("/users/newGet", userRouter);

// mushkirmohamed
// 2qZMk8OWmlngnLC6
