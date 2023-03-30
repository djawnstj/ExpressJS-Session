class HandlerInterceptor {

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {boolean}
     */
    preHandle = (req, res) => {
        throw new Error("preHandle is not implemented");
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @return {boolean}
     */
    postHandle = (req, res) => {
        throw new Error("postHandle is not implemented");
    }

}

module.exports = HandlerInterceptor;