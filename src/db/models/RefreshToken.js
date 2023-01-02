const db = require(".")
const User = require("./user")

const RefreshToken = db.sequelize.define("refresh_tokens", {
    token: {
        type: db.DataTypes.TEXT,
        allowNull: false,
    },
    expireIn: {
        type: db.DataTypes.DATE,
    },
    userId: {
        type: db.DataTypes.UUID,
        references: {
            model: "user",
            key: "id"
        }
    }
},
    {
        timestamps: false,
        freezeTableName: true
    })


User.hasOne(RefreshToken)


module.exports = RefreshToken
