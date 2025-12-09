const express = require("express");
const router = express.Router();
const { addRating, getStoreRatings } = require("../controllers/ratingController");

// POST → /api/rating/add
router.post("/add", addRating);

// GET → /api/rating/store/:storeId
router.get("/store/:storeId", getStoreRatings);

module.exports = router;
