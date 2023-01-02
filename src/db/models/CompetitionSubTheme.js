const db = require(".")
const Competition = require("./Competition")

const CompetitionSubTheme = db.sequelize.define("competition_sub_themes", {
    name: {
        type: db.DataTypes.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true
    })

Competition.hasMany(CompetitionSubTheme)
CompetitionSubTheme.belongsTo(Competition, {
    foreignKey: 'competitionId'
})

module.exports = CompetitionSubTheme
