// models/Recipe.js
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    RecipeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Ingredients: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    Instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CuisineType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DietaryTags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DifficultyLevel: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
    },
    AverageRating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    NumberOfRatings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CreationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        name: "UserUserID", // Specify the name of the foreign key column
        allowNull: false,
        onDelete: "CASCADE",
      },
    });
  };

  return Recipe;
};
