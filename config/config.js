const SessionStoreRegister = require("../session/SessionStoreRegister");
const RedisSessionStore = require("../session/RedisSessionStore");

module.exports = {
    redis: {
        failover: false,
        socket: {
            host: "172.31.96.1",
            port: 6379,
        },
        name: 'mymaster',
        socket_keepalive : true
    },
    /**
     * @param { InterceptorRegister } register
     */
    // addInterceptors: (register) => {
    //     register.addInterceptor(new SecondInterceptor())
    //         .addPaths("/*")
    //         .excludePaths("/check")
    //         .setOrder(1)
    //     register.addInterceptor(new FirstInterceptor())
    //         .addPaths("/*")
    //         // .setOrder(2)
    //     register.addInterceptor(new ThirdInterceptor())
    //         .addPaths("/*")
    //         .setOrder(1)
    // },

    /**
     * @param {SessionStoreRegister} register
     * @return {SessionStoreRegister}
     */
    setSessionStore: (register) => {
        register.setStore(new RedisSessionStore(this.redis))
            .setExpireTime(10)

        return register;
    },
}