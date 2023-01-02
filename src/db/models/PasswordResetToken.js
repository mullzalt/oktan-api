const db = require(".")
const User = require("./user")

const PasswordResetToken = db.sequelize.define("password_reset_tokens", {
    token: {
        type: db.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: db.DataTypes.UUID,
        references: {
            model: "user",
            key: "id"
        }
    },
    expireIn: {
        type: db.DataTypes.DATE,
    }
},
    {
        timestamps: true,
        freezeTableName: true
    })

User.hasOne(PasswordResetToken)
PasswordResetToken.belongsTo(User)

module.exports = PasswordResetToken