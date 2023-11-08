import express from "express";
const router = express.Router();

import {
  userregister,
  userlogin,
  userlogout,
} from "../controller/usercontroller.js";

// Registration route
router.post("/register", userregister);

// Login route
router.post("/login", userlogin);

// Logout

router.get("/logout", userlogout);

export default router;
