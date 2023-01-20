const Cbt = require("./models/Cbt");
const CbtAnswer = require("./models/CbtAnswer");
const CbtOption = require("./models/CbtOption");
const CbtQuestion = require("./models/CbtQuestion");
const Competition = require("./models/Competition");
const User = require("./models/User");
const Profile = require('./models/Profile');
const VerificationToken = require("./models/VerificationToken");


module.exports = {
    User,
    Competition,
    Profile,
    VerificationToken,
    BankAccount: require('./models/BankAccount'),
    Invoice: require('./models/Invoice'),


    Cbt,
    CbtQuestion,
    CbtOption,
    CbtAnswer
}