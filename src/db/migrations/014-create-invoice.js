'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('competition_team_members', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
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
                    model: 'user_profiles',
                    key: 'id'
                }
            },
            paymentTo: {
                type: Sequelize.UUID,
                references: {
                    model: 'bank_accounts',
                    key: 'id'
                }
            },
            total_ammount: {
                type: Sequelize.DOUBLE
            },
            bank_customer: {
                type: Sequelize.STRING
            },
            bank_number: {
                type: Sequelize.STRING
            },
            proof_file: {
                type: Sequelize.TEXT
            },
            status: {
                type: Sequelize.ENUM('UNPAID', 'PENDING', 'REJECTED', 'PAIDOFF'),
                defaultValue: 'UNPAID'
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