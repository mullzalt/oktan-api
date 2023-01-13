'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.INTEGER
      },
      optionCount: {
        type: Sequelize.INTEGER
      },
      onCorrectPoint: {
        type: Sequelize.INTEGER
      },
      onNullPoint: {
        type: Sequelize.INTEGER
      },
      onWrongPoint: {
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.TEXT
      },
      archived: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cbts');
  }
};