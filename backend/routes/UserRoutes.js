import express from "express";
import { getAllUser, login, signup } from "../controllers/UserController.js";
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup); //http://localhost:5000/api/user/signup
router.post("/login", login);
export default router;
