'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbt_member_answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      optionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cbt_question_options',
          references: 'id'
        }
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cbt_questions',
          references: 'id'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cbt_members',
          references: 'id'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      isCorrect: {
        type: Sequelize.BOOLEAN
      },
      isEmpty: {
        type: Sequelize.BOOLEAN
      },
      isWrong: {
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
    await queryInterface.dropTable('cbt_member_answers');
  }
};