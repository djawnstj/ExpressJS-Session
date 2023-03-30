const HandlerInterceptor = require("./HandlerInterceptor");

class FirstInterceptor extends HandlerInterceptor {

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {boolean}
     */
    preHandle = (req, res) => {
        console.log("FirstInterceptor preHandle() called.")
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {boolean}
     */
    postHandle = (req, res) => {
        console.log("FirstInterceptor postHandle() called.")
    }

}

module.exports = FirstInterceptor;