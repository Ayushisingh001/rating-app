const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminController = require("../controllers/admincontroller");

// -------------------- ADMIN LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ where: { email, role: "admin" } });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- ADMIN STATS --------------------
router.get("/stats", AdminController.getStats);

// -------------------- GET ALL USERS --------------------
router.get("/users", AdminController.getAllUsers);

// -------------------- ADD USER (THIS FIXES YOUR ERROR) --------------------
router.post("/add-user", async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, password required" });
    }

    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      address: address || null,
      role: role || "user"
    });

    res.status(201).json({
      message: "User added successfully",
      user: newUser
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- STORE ROUTES --------------------
router.get("/stores", AdminController.getAllStores);
router.post("/stores", AdminController.addStore);

module.exports = router;
