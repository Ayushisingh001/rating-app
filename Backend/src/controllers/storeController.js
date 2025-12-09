const Store = require("../models/Store");

exports.addStore = async (req, res) => {
  try {
    const { name, location, category } = req.body; // include category

    if (!name || !location || !category) {
      return res.status(400).json({ message: "Name, location, and category are required" });
    }

    const newStore = await Store.create({ name, location, category });

    res.json({
      message: "Store added successfully",
      store: newStore,
    });
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).json({ message: "Server error" });
  }
};
