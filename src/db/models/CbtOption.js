const { Sequelize } = require('sequelize');
const db = require('.');
const CbtQuestion = require('./CbtQuestion');

const CbtOption = db.sequelize.define('cbt_question_options', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  option: { type: Sequelize.TEXT },
  imgUrl: { type: Sequelize.TEXT },
  questionId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'cbt_questions'
    }
  },
})

CbtQuestion.hasMany(CbtOption, {
  foreignKey: 'questionId',
  as: 'options',
})

CbtOption.belongsTo(CbtQuestion, {
  foreignKey: 'questionId',
  as: 'options',
})

module.exports = CbtOption

