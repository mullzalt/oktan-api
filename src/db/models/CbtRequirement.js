
const { Sequelize, DataTypes } = require('sequelize');
const db = require('.');
const Cbt = require('./Cbt');
const CbtOption = require('./CbtOption');
const CbtQuestion = require('./CbtQuestion');
const Competition = require('./Competition');

const CbtRequirement = db.sequelize.define('cbt_competition_requirements', {
  competitionId: DataTypes.UUID,
  cbtId: DataTypes.UUID
})

Cbt.hasMany(CbtRequirement, {
  foreignKey: 'cbtId'
})
CbtRequirement.belongsTo(Cbt, {
  foreignKey: 'cbtId'
})

CbtRequirement.belongsTo(Competition, {
  foreignKey: 'competitionId'
})

Competition.hasMany(CbtRequirement, {
  foreignKey: 'competitionId'
})


module.exports = CbtRequirement

