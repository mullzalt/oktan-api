const login = require("./auths/login");
const { createCbt, updateCbt, getCbts, getCbtById, deleteCbt } = require("./cbts/cbt");
const { createQuestion, getQuestions, deleteQuestion, updateQuestion, getQuestionById } = require("./cbts/cbtQuestion");
const { createOption, updateOption, getOptions, getOptionsById, deleteOption } = require("./cbts/cbtOption");
const refresh = require("./auths/refreshToken");
const register = require("./auths/register");
const { verifyAccount } = require("./auths/verifyAccount");
const { resendMail } = require("./auths/sendVerifyMail");
const { getUsers } = require("./users/crudUser");
const { uploadCbtCover } = require("./cbts/cbtCover");
const { getMe } = require("./auths/getMe");


module.exports = {
    login,
    register,
    refresh,
    verifyAccount,
    resendMail,
    getMe,

    user: {
        getUsers
    },

    cbt: {
        createCbt,
        updateCbt,
        getCbts,
        getCbtById,
        deleteCbt,
        uploadCbtCover
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
