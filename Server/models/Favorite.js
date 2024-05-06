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

  return Favorite;
};
