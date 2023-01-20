'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const db = require('.');
const Cbt = require('./Cbt');
const User = require('./User');

const CbtMember = db.sequelize.define('cbt_members', {
  cbtId: DataTypes.UUID, 
  userId: DataTypes.UUID, 
  score: DataTypes.INTEGER, 
  startAt: DataTypes.DATE, 
  endAt: DataTypes.DATE,
  doneAt: DataTypes.DATE, 
  token: DataTypes.STRING
}, {
  freezeTableName: true,
  timestamps: true
})


User.hasMany(CbtMember, {
  foreignKey: 'userId'
})
CbtMember.belongsTo(User, {
  foreignKey: 'userId'
})

CbtMember.belongsTo(Cbt, {
  foreignKey: 'cbtId'
})

Cbt.hasMany(CbtMember, {
  foreignKey: 'cbtId'
})

module.exports = CbtMember





