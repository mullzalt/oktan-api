'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('competition_team_members', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    references: 'id'
                }
            },
            messages: {
                type: Sequelize.TEXT
            },
            type: {
                type: Sequelize.ENUM('ERROR', 'WARNING', 'SUCCESS', 'INFO'),
                defaultValue: 'INFO'
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
        await queryInterface.dropTable('competition_team_members');
    }
};