'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('competition_members', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            competitionId: {
                type: Sequelize.UUID,
                references: {
                    model: 'competitions',
                    key: 'id'
                }
            },
            memberId: {
                type: Sequelize.UUID,
                references: {
                    model: 'user_members',
                    key: 'id'
                }
            },
            allowedToJoin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            team_name: {
                type: Sequelize.STRING,
            },
            mentor_name: {
                type: Sequelize.STRING,
            },
            mentor_number: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'ENROLLED', 'ACTIVE', 'PASSED', 'DISMISSED'),
                defaultValue: 'PENDING'
            },
            card_file: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('competition_members');
    }
};