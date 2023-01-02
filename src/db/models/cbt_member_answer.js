'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cbt_member_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cbt_member_answer.init({
    optionId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    memberId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'cbt_member_answer',
  });
  return cbt_member_answer;
};