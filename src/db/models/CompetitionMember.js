const db = require(".")
const Competition = require("./Competition")
const Member = require("./Member")

const CompetitionTeamMember = db.sequelize.define("competition_member_teams", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    allowedToJoin: {
        type: db.DataTypes.BOOLEAN,
        defaultValue: false
    },
    team_name: {
        type: db.DataTypes.STRING,
    },
    mentor_name: {
        type: db.DataTypes.STRING,
    },
    mentor_number: {
        type: db.DataTypes.STRING,
    },
    status: {
        type: db.DataTypes.ENUM('PENDING', 'ENROLLED', 'ACTIVE', 'PASSED', 'DISMISSED'),
        defaultValue: 'PENDING'
    },
    card_file: {
        type: db.DataTypes.TEXT
    }
},
    {
        freezeTableName: true,
    })

Member.belongsToMany(Competition, { through: CompetitionTeamMember, as: 'competition' })
Competition.belongsToMany(Member, { through: CompetitionTeamMember, as: 'member' })

CompetitionTeamMember.belongsTo(Member);
CompetitionTeamMember.belongsTo(Competition);
Member.hasMany(CompetitionTeamMember);
Competition.hasMany(CompetitionTeamMember)

module.exports = CompetitionTeamMember