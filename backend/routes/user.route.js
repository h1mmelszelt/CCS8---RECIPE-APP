import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  addBookmark,
  removeBookmark,
  getBookmarks,
  updateProfilePicture
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/bookmarks", addBookmark);
router.delete("/bookmarks/:userId/:recipeId", removeBookmark);
router.get("/bookmarks/:id", getBookmarks);
router.put("/:id/profile-picture", updateProfilePicture);

export default router;
