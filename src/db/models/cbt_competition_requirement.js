'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cbt_competition_requirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cbt_competition_requirement.init({
    competitionId: DataTypes.UUID,
    cbtId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'cbt_competition_requirement',
  });
  return cbt_competition_requirement;
};