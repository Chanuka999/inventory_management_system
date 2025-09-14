import User from "../models/user.js";
import bcrypt from "bcrypt";
const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const exUser = await User.findOne({ email });
    if (exUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "User added successfully" });
  } catch (error) {
    console.error("Error adding User:", error);
    return res.status(500).json({ sucess: false, message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "server error in getting" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile", error);
    return res.status(500).json({
      success: false,
      message: "server error in getting user profile",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    console.error("Error deleting user", error);
    return res.status(500).json({ success: false, message: "sercer error" });
  }
};

export { addUser, getUser, deleteUser, getUsers };
