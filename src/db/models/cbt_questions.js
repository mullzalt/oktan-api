'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cbt_questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cbt_questions.init({
    question: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
    cbtId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'cbt_questions',
  });
  return cbt_questions;
};