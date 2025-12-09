const express = require("express");
const router = express.Router();
const { addStore } = require("../controllers/storeController");
const Store = require("../models/Store"); // <-- make sure this is added

// POST → /api/store/add
router.post("/add", addStore);

// GET → /api/store/get-all (or simply /stores)
router.get("/get-all", async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json({ stores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stores" });
  }
});

module.exports = router;
