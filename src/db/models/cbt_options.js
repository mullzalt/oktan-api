'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cbt_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cbt_options.init({
    option: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
    questionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cbt_options',
  });
  return cbt_options;
};