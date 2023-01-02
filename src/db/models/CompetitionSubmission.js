const db = require(".")
const Participant = require("./CompetitionMember")

const Submission = db.sequelize.define("competition_team_submissions", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: db.DataTypes.STRING
    },
    theme: {
        type: db.DataTypes.STRING
    },
    mentor: {
        type: db.DataTypes.STRING
    },
    mentor_id_number: {
        type: db.DataTypes.STRING
    },
    attachment: {
        type: db.DataTypes.TEXT
    },
    status: {
        type: db.DataTypes.ENUM('PENDING', 'SENT', 'REVIEWED'),
        defaultValue: 'PENDING'
    },
    score: {
        type: db.DataTypes.INTEGER
    },
},
    {
        freezeTableName: true
    })

Participant.hasOne(Submission, {
    foreignKey: {
        name: 'participantId',
    }
})
Submission.belongsTo(Participant)

module.exports = Submission
