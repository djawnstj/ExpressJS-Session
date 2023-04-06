const SessionStoreRegister = require("../session/SessionStoreRegister");
const RedisSessionStore = require("../session/RedisSessionStore");
const DarwinTSessionInterceptor = require("../interceptor/DarwinTSessionInterceptor");

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

    /**
     * @param {SessionStoreRegister} register
     * @return {SessionStoreRegister}
     */
    setSessionStore: (register) => {
        register.setStore(RedisSessionStore)
            .setExpireTime(10)

        return register;
    },
}