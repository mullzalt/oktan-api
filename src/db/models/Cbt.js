const { Sequelize } = require("sequelize");
const db = require(".");

const Cbt = db.sequelize.define('cbts', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  title: {
    type: Sequelize.STRING
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  },
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 60
  },
  optionCount: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  onCorrectPoint: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  onNullPoint: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  onWrongPoint: {
    type: Sequelize.INTEGER, 
    defaultValue: -1
  },
  imgUrl: {
    type: Sequelize.INTEGER
  },
  archived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  freezeTableName: true,
  timestamps: true
})

module.exports = Cbt
