'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('competition_member_submissions', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING
            },
            competitionMemberId: {
                type: Sequelize.UUID,
                references: {
                    model: 'competition_members',
                    key: 'id'
                }
            },
            theme: {
                type: Sequelize.STRING
            },
            mentor: {
                type: Sequelize.STRING
            },
            mentor_id_number: {
                type: Sequelize.STRING
            },
            attachment: {
                type: Sequelize.TEXT
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'SENT', 'REVIEWED'),
                defaultValue: 'PENDING'
            },
            score: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('competition_member_submissions');
    }
};