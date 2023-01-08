const login = require("./auths/login");
const { createCbt, updateCbt, getCbts, getCbtById, deleteCbt } = require("./cbts/cbt");
const { createQuestion, getQuestions, deleteQuestion, updateQuestion, getQuestionById } = require("./cbts/cbtQuestion");
const { createOption, updateOption, getOptions, getOptionsById, deleteOption } = require("./cbts/cbtOption");
const refresh = require("./auths/refreshToken");
const register = require("./auths/register");
const { verifyAccount } = require("./auths/verifyAccount");
const { resendMail } = require("./auths/sendVerifyMail");
const { getUsers } = require("./users/crudUser");



module.exports = {
    login,
    register,
    refresh,
    verifyAccount,
    resendMail,

    user: {
        getUsers
    },

    cbt: {
        createCbt,
        updateCbt,
        getCbts,
        getCbtById,
        deleteCbt
    },

    cbtQuestion: {
        createQuestion,
        updateQuestion,
        getQuestions,
        getQuestionById,
        deleteQuestion
    },

    cbtOption: {
        createOption,
        updateOption,
        getOptions,
        getOptionsById,
        deleteOption
    }
}
