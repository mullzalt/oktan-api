const login = require("./auths/login");
const refresh = require("./auths/refreshToken");
const register = require("./auths/register");
const { verifyAccount } = require("./auths/verifyAccount");
const { resendMail } = require("./auths/sendVerifyMail");
const { getMe } = require("./auths/getMe");


module.exports = {
    login,
    register,
    refresh,
    verifyAccount,
    resendMail,
    getMe,
}
