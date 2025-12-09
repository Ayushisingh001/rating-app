const Rating = require("../models/Rating");
const User = require("../models/User");

// POST add rating
exports.addRating = async (req, res) => {
  try {
    const { storeId, userId, rating } = req.body;
    if (!storeId || !userId || !rating) return res.status(400).json({ message: "All fields required" });
    if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating 1-5 only" });

    const newRating = await Rating.create({ storeId, userId, rating });
    res.json({ message: "Rating added successfully", rating: newRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all ratings of a store
exports.getStoreRatings = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    if (!storeId) return res.status(400).json({ message: "Store ID required" });

    const ratings = await Rating.findAll({
      where: { storeId },
      include: [{ model: User, attributes: ["id", "name", "email"] }]
    });

    res.json({ count: ratings.length, ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
