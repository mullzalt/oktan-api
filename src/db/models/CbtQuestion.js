const { Sequelize } = require('sequelize');
const db = require('.');
const Cbt = require('./Cbt');
const User = require('./User');

const CbtQuestion = db.sequelize.define('cbt_questions', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    question: {
        type: Sequelize.TEXT
    },
    imgUrl: {
        type: Sequelize.TEXT
    },
    cbtId: {
        type: Sequelize.UUID,
        references: {
            model: 'cbts',
            key: 'id'
        }
    },
    createdBy: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
})

Cbt.hasMany(CbtQuestion)
CbtQuestion.belongsTo(Cbt)

CbtQuestion.belongsTo(User, {
    foreignKey: 'createdBy',
})

module.exports = CbtQuestion

