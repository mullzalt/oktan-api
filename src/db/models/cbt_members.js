'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cbt_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cbt_members.init({
    cbtId: DataTypes.UUID,
    memberId: DataTypes.UUID,
    score: DataTypes.INTEGER,
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'cbt_members',
  });
  return cbt_members;
};