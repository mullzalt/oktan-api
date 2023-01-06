const login = require("./auths/login");
const { createCbt, updateCbt, getCbts, getCbtById, deleteCbt } = require("./cbts/cbt");
const { createQuestion, getQuestions, deleteQuestion, updateQuestion, getQuestionById } = require("./cbts/cbtQuestion");
const { createOption, updateOption, getOptions, getOptionsById, deleteOption } = require("./cbts/cbtOption");


module.exports = {
    login,

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
