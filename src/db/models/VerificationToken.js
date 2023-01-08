const db = require(".")
const User = require("./User")

const VerificationToken = db.sequelize.define("user_verification_tokens", {
    token: {
        type: db.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: db.DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        }
    }
},
    {
        timestamps: true,
        freezeTableName: true
    })

User.hasOne(VerificationToken)
VerificationToken.belongsTo(User)

module.exports = VerificationToken