import express from "express";
import rootRouter from "./routers/main.js";
import userRouter from "./routers/users.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

const server = express();

const SERVER_PORT = 8888;

server.use(express.json());

server.use(rootRouter);

server.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});

console.log("Hello new chrome debugger!");

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on: http://localhost:${SERVER_PORT}`);
});

// console.log(dotenv.config().parsed.MONGODB_URL);
const connectionString = dotenv.config().parsed.MONGODB_URL;

if (connectionString) {
  try {
    mongoose.Promise = Promise;
    mongoose.connect(connectionString);
  } catch (error) {
    console.log("Error from MongoDB: " + error);
  }
} else {
  console.error("ENV is not set!");
}
