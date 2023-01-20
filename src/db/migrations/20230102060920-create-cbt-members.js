'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbt_members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      memberId: {
        type: Sequelize.UUID,
        references: {
          model: 'user_profiles',
          key: 'id'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      score: {
        type: Sequelize.INTEGER
      },
      startAt: {
        type: Sequelize.DATE
      },
      endAt: {
        type: Sequelize.DATE
      },
      doneAt: {
        type: Sequelize.DATE
      },
      token: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('cbt_members');
  }
};