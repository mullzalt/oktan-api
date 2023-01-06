const { Sequelize } = require('sequelize');
const db = require('.');
const CbtOption = require('./CbtOption');
const CbtQuestion = require('./CbtQuestion');

const CbtAnswer = db.sequelize.define('cbt_question_answers', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  questionId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'cbt_questions'
    }
  },
  optionId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'cbt_question_options'
    }
  },
})

CbtQuestion.hasOne(CbtAnswer)
CbtAnswer.belongsTo(CbtQuestion, {
  foreignKey: 'questionId'
})

CbtOption.hasOne(CbtAnswer)
CbtAnswer.belongsTo(CbtOption, {
  foreignKey: 'optionId'
})


module.exports = CbtAnswer

