import express, { Router } from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from "body-parser";
import router  from './routes/UserRoutes.js'
import taskRouter from './routes/TaskRoutes.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://ektas:ektanai@cluster0.blywt3n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listen on localhost 5000"))

  .catch((err) => console.log(err));
  app.use("/api/user",router);
  app.use("/api/task", taskRouter);
