const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Store = require("./Store");

const Rating = sequelize.define("Rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

// Associations
Rating.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Rating, { foreignKey: "userId" });

Rating.belongsTo(Store, { foreignKey: "storeId" });
Store.hasMany(Rating, { foreignKey: "storeId" });

module.exports = Rating;
