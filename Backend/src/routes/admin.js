const express = require("express");
const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const adminAuth = require("../middleware/adminauth");

const router = express.Router();

// Dashboard summary
router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    return res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Add new user (normal/admin)
router.post("/add-user", adminAuth, async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const user = await User.create({ name, email, password, address, role });

    res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Add store
router.post("/add-store", adminAuth, async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const store = await Store.create({ name, email, address });

    return res.status(201).json({ store });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// View all users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// View all stores
router.get("/stores", adminAuth, async (req, res) => {
  try {
    const stores = await Store.findAll();
    return res.json({ stores });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
