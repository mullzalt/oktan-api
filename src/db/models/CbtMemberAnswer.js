'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const db = require('.');
const CbtMember = require('./CbtMember');
const CbtOption = require('./CbtOption');
const CbtQuestion = require('./CbtQuestion');


const CbtMemberAnswer = db.sequelize.define('cbt_member_answers', {
  optionId: DataTypes.INTEGER,
  questionId: DataTypes.INTEGER,
  memberId: DataTypes.UUID,
  isCorrect: {
    type: DataTypes.BOOLEAN
  },
  isEmpty: {
    type: DataTypes.BOOLEAN
  },
  isWrong: {
    type: DataTypes.BOOLEAN
  },

}, {
  freezeTableName: true,
  timestamps: true
})

CbtMember.hasMany(CbtMemberAnswer, {
  foreignKey: 'memberId', 
})

CbtMemberAnswer.belongsTo(CbtMember, {
  foreignKey: 'memberId'
})

module.exports = CbtMemberAnswer





