const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Store = sequelize.define("Store", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Store name (required)
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Location like: Delhi, Mumbai, Sector 21, etc.
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Type of store (Cafe, Grocery, Restaurant, Bakery...)
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Store;
