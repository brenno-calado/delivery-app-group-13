'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
        name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
        price: { type: Sequelize.DECIMAL(4,2), allowNull: false },
        url_image: { type: Sequelize.STRING(200), allowNull: false },
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
