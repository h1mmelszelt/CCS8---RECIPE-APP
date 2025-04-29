import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/user.controller.js";

const router = express.Router();


router.post("/login", loginUser); // Add login route
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById); //no postman req yet
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
