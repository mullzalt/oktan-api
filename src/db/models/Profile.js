const db = require(".")
const User = require('./User')
const Sequelize = require('sequelize')

const Profile = db.sequelize.define("user_profiles", {
    id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    institute: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    profile: {
        type: Sequelize.TEXT
    },
    avatar: {
        type: Sequelize.TEXT
    },
    userId: {
        type: Sequelize.UUID, 
        references: {
            model: User, 
            key: 'id'
        }
    }
},
    {
        timestamps: true,
        freezeTableName: true
    })

User.hasOne(Profile, {
    foreignKey: {
        name: 'userId',
        type: db.DataTypes.UUID
    }
})
Profile.belongsTo(User)

module.exports = Profile