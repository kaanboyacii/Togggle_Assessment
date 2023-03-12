import express from "express";
import { logout, signin, signup } from "../controllers/auth.js";

const router = express.Router();

//Sign up
router.post("/signup",signup)

//Sign in
router.post("/signin",signin)

//Sign in
router.post("/logout",logout)

export default router;