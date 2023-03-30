const HandlerInterceptor = require("./HandlerInterceptor");
const sessionFactory = require("../session/SessionFactory");
const config = require("../config/config");

class SessionManagerInterceptor extends HandlerInterceptor {

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {boolean}
     */
    preHandle = (req, res) => {
        this.#addGetSessionMethod(req, res);
        this.#addRemoveSessionMethod(req, res);
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {boolean}
     */
    postHandle = (req, res) => {
    }


    /**
     * @param {Request} req
     * @param {Response} res
     */
    #addGetSessionMethod = (req, res) => {
        /**
         * @param { boolean } [status=true]
         * @return {HttpSession}
         */
        req.getSession = async (status = true) => {

            let cookieSessionKey;
            if (req.cookies) cookieSessionKey = req.cookies[config.sessionKey];

            return await sessionFactory.getSession(cookieSessionKey, res, status);
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    #addRemoveSessionMethod = (req, res) => {

        req.removeSession = async () => {

            let cookieSessionKey;
            if (req.cookies) cookieSessionKey = req.cookies[config.sessionKey];

            if (cookieSessionKey) await sessionFactory.removeSession(cookieSessionKey);
            res.clearCookie([config.sessionKey]);
        }
    }

}

module.exports = SessionManagerInterceptor;