const InterceptorRegister = require("../interceptor/InterceptorRegister");
const SecondInterceptor = require("../interceptor/SecondInterceptor");
const FirstInterceptor = require("../interceptor/FirstInterceptor");
const ThirdInterceptor = require("../interceptor/ThirdInterceptor");
const RedisSessionStore = require("../session/RedisSessionStore");

module.exports = {

    /**
     * @param { InterceptorRegister } register
     */
    addInterceptors: (register) => {
        register.addInterceptor(new SecondInterceptor())
            .addPaths("/*")
            .excludePaths("/check")
            .setOrder(1)
        register.addInterceptor(new FirstInterceptor())
            .addPaths("/*")
            // .setOrder(2)
        register.addInterceptor(new ThirdInterceptor())
            .addPaths("/*")
            .setOrder(1)
    },
    sessionKey: "USESSION_ID",
    EXPIRE_TIME: 1800,
    // sessionStore: RedisSessionStore,
}