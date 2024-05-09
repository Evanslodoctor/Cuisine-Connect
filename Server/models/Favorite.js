const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {
    FavoriteID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FavoriteDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  // Define associations
  Favorite.associate = (models) => {
    // A Favorite belongs to a User
    Favorite.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    // A Favorite belongs to a Recipe
    Favorite.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Favorite;
};
