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
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: true
})

module.exports = Cbt
