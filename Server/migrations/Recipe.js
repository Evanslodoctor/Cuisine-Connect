"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipes", "UserUserID", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Corrected model name to singular and capitalized
        key: "UserID",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipes", "UserUserID");
  },
};
