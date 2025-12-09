const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // ensures email is valid
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  role: {
    type: DataTypes.ENUM("user", "admin", "store_owner"),
    allowNull: false,
    defaultValue: "user",
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
  tableName: "Users", // ensures table name stays 'Users'
});

// Optional: sync table (useful for development)
// sequelize.sync({ alter: true })
//   .then(() => console.log("User table synced"))
//   .catch((err) => console.error("Error syncing User table:", err));

module.exports = User;
