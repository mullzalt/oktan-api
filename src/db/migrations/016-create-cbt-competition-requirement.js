'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbt_competition_requirements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      competitionId: {
        type: Sequelize.UUID,
        references: {
          model: 'competitions',
          key: 'id'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        
      },
      cbtId: {
        type: Sequelize.UUID,
        references: {
          model: 'cbts',
          key: 'id'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('cbt_competition_requirements');
  }
};