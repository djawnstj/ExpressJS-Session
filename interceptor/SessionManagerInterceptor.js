const HandlerInterceptor = require("./HandlerInterceptor");
const sessionFactory = require("../session/SessionFactory");
const sessionStore = require("../session/sessionStore");

class SessionManagerInterceptor extends HandlerInterceptor {

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {boolean}
     */
    preHandle = (req, res) => {
        this.#addSessionGetterMethod(req, res);
        this.#addSessionRemoveMethod(req, res);
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
    #addSessionGetterMethod = (req, res) => {
        /**
         * @param { boolean } [status=true]
         * @return {HttpSession}
         */
        req.getSession = async (status = true) => {

            let cookieSessionKey;
            if (req.cookies) cookieSessionKey = req.cookies[sessionStore.sessionKey];

            return await sessionFactory.getSession(cookieSessionKey, res, status);
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    #addSessionRemoveMethod = (req, res) => {

        req.removeSession = async () => {

            let cookieSessionKey;
            if (req.cookies) cookieSessionKey = req.cookies[sessionStore.sessionKey];

            if (cookieSessionKey) await sessionFactory.removeSession(cookieSessionKey);
            res.clearCookie(sessionStore.sessionKey);
        }
    }

}

module.exports = SessionManagerInterceptor;