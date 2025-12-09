const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");

// import routes
const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/storeroutes");
const ratingRoutes = require("./routes/ratingroutes");

// ⭐ You can use this OR your current import — both work
const adminRoutes = require("./routes/adminroutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// create tables if not exist
sequelize.sync({ force: false, alter: false }).then(() => {
  console.log("All models synced!");
});

// basic test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/rating", ratingRoutes);

// ⭐ This line is correct (admin panel backend)
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
