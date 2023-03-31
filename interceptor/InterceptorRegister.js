const HandlerInterceptor = require("./HandlerInterceptor");
const InterceptorRegistryInfo = require("./InterceptorRegistryInfo");

class InterceptorRegister {

    /**
     * @type { InterceptorRegistryInfo[] }
     */
    #interceptors;

    constructor() {
        this.#interceptors = [];
    }

    /**
     * @param { HandlerInterceptor } interceptor
     * @return { InterceptorRegistryInfo }
     */
    addInterceptor = (interceptor) => {
        const info = new InterceptorRegistryInfo(interceptor);
        this.#interceptors.push(info);
        return info;
    }

    sortInterceptors = () => {
        this.#interceptors.sort((f, s) => f.getOrder() - s.getOrder());
    }

    /**
     * @param { Express } app
     */
    registerInterceptor = (app) => {
        this.sortInterceptors();
        app.use(this.#launchInterceptor);
    }

    /**
     * @param { Request } req
     * @param { Response } res
     * @param { function } next
     */
    #launchInterceptor = (req, res, next) => {
        const responseCallback = [];

        this.#interceptors.forEach(interceptorInfo => {
            const support = interceptorInfo.support(req.url);
            if (support) responseCallback.push(interceptorInfo.intercept(req, res, next));
        });

        next();

        responseCallback.reverse().forEach(fun => res.on("finish", () => fun(req, res)));
    }

}

module.exports = InterceptorRegister;