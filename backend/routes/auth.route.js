import express from "express";
import {
  login,
  logout,
  signup,
  authCheck,
} from "../controllers/auth.controller.js";
import { productRoute } from "../middleware/productRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authCheck", productRoute, authCheck);

export default router;
