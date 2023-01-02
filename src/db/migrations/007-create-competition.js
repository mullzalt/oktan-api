'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('competitions', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            cover_image: {
                type: Sequelize.TEXT
            },
            entry_fee: {
                type: Sequelize.DOUBLE
            },
            category: {
                type: Sequelize.ENUM('ISOTERM', 'CRYSTAL'),
                defaultValue: 'ISOTERM'
            },
            payment_method: {
                type: Sequelize.ENUM('FREE', 'REQUIRED', 'LATER'),
                defaultValue: 'FREE'
            },
            precautions: {
                type: Sequelize.TEXT
            },
            exam_type: {
                type: Sequelize.ENUM('CBT', 'PAPER', 'ABSTRACT'),
                defaultValue: 'CBT'
            },
            min_participant: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            max_participant: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            register_due: {
                type: Sequelize.DATE
            },
            register_start: {
                type: Sequelize.DATE
            },
            start_date: {
                type: Sequelize.DATE
            },
            end_date: {
                type: Sequelize.DATE
            },
            visible: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
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
        await queryInterface.dropTable('competitions');
    }
};