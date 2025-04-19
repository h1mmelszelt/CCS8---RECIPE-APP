import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // Unique identifier for the user (Mongoose adds _id automatically)

    // Username for login or display - must be unique
    username: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same username
      trim: true, // Removes whitespace from the beginning and end
      minlength: 3, // Example: minimum length for username
    },

    // Email for login or communication - must be unique
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same email
      trim: true,
      lowercase: true, // Stores emails in lowercase for consistency
      // Basic email format validation (more robust validation might be needed)
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },

    // Password field - REQUIRED to store the HASHED password
    // NEVER store plain text passwords. You will need middleware
    // or a separate service to hash passwords before saving.
    password: {
      type: String,
      required: true,
      minlength: 6, // Example: minimum length for password (hashed password length depends on algorithm)
    },

    // Optional: User's display name
    name: {
      type: String,
      required: false, // Name is optional
      trim: true,
    },

    // Optional: Link to recipes created by this user (for easier querying)
    // Although recipes reference the user via author_id, sometimes
    // having a list of recipe IDs on the user can be useful.
    // This would require updating the user document when a recipe is created.
    // recipes: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Recipe'
    // }],

    // Optional: Link to reviews left by this user
    // reviews: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Review' // Assuming you create a Review model
    // }],

    // Add other user-related fields here (e.g., profile picture URL, join date, etc.)
    // profilePicture: {
    //   type: String,
    //   required: false
    // }
  },
  {
    // Mongoose adds createdAt and updatedAt timestamps automatically
    timestamps: true,
    // Disable the __v version key
    versionKey: false,
  }
);

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

export default User;
