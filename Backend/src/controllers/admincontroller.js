const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

// GET ADMIN STATS
exports.getStats = async (req, res) => {
  try {
    const users = await User.count();
    const stores = await Store.count();
    const ratings = await Rating.count();

    res.json({ users, stores, ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["name", "ASC"]] });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL STORES
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({ order: [["name", "ASC"]] });
    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD USER
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed, address, role });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD STORE
exports.addStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const Store = require("../models/Store");
    const existing = await Store.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Store already exists" });

    const store = await Store.create({ name, email, address });
    res.status(201).json(store);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
