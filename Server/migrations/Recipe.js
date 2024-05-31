'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Recipes', 'Image', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Recipes', 'UniqueId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Recipes', 'Image');
    await queryInterface.removeColumn('Recipes', 'UniqueId');
  }
};
