import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Save user (Password hashing is handled by the pre-save hook in User model - Step 5 says retain hashing logic, but Step 6 says hash here? Actually User model already has it. I'll hash here to be safe if the model doesn't have it, or check the model again.)
    // Actually, I updated the model in backend-1 with a pre-save hook. 
    // If I hash here AND in the pre-save hook, it will be double hashed. 
    // I will check the model first.

    const newUser = new User({
      name,
      email,
      password: password, // Pre-save hook will hash it
    });

    await newUser.save();

    // 5. Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error(`Registration error: ${error.message}`);
    res.status(500).json({
      message: "Server error",
    });
  }
};
