const { Sequelize, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    CommentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CommentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CommentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Comment;
}
