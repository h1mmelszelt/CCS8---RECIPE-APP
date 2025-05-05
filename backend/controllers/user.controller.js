import User from "../models/user.model.js";
import Recipe from "../models/recipe.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Don't return password
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get basic user info (name and profilePicture only)
export const getBasicUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("name profilePicture");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, name, password } = req.body;

    const updateData = { username, email, name };

    // If password is being updated, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Debugging: Log the JWT_SECRET value
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Add a recipe to bookmarks
export const addBookmark = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.bookmarks.includes(recipeId)) {
      return res
        .status(200)
        .json({ success: true, message: "Recipe already bookmarked" });
    }

    user.bookmarks.push(recipeId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Recipe bookmarked successfully" });
  } catch (error) {
    console.error("Error adding bookmark:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove a recipe from bookmarks
export const removeBookmark = async (req, res) => {
  let { userId, recipeId } = req.params;
  try {
    userId = String(userId);
    recipeId = String(recipeId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const bookmarkIds = user.bookmarks.map(id => String(id));
    const recipeIndex = bookmarkIds.indexOf(recipeId);
    if (recipeIndex === -1) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }
    user.bookmarks.splice(recipeIndex, 1);
    await user.save();
    res.status(200).json({ success: true, message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error removing bookmark:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all bookmarks for a user
export const getBookmarks = async (req, res) => {
  const { id } = req.params; // Use 'id' instead of 'userId'

  try {
    const user = await User.findById(id).populate("bookmarks");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user.bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params; // User ID from the URL
    console.log("Received body:", req.body); // Log the request body for debugging
    // Accept both direct Cloudinary URL (from frontend) and file upload (from form)
    if (req.body.profilePicture) {
      // If the frontend sends a Cloudinary URL directly
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { profilePicture: req.body.profilePicture },
        { new: true, runValidators: true }
      ).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Profile picture updated", user: updatedUser });
    } else {
      return res.status(400).json({ message: "No file or profilePicture URL provided" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
