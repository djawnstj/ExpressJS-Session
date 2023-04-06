const MemorySessionStore = require("./MemorySessionStore");
const SessionStore = require("./SessionStore");

class SessionStoreRegister {

    /**
     * @type {SessionStore}
     */
    #sessionStore;

    /**
     * @param {SessionStore} store
     * @return {SessionStoreRegister}
     */
    setStore = (store ) => {
        if (typeof store !== "function") throw new Error("Must use the constructor.");
        this.#sessionStore = store;

        return this;
    }

    /**
     * @return {SessionStore}
     */
    getStore = () => {
        if (!this.#sessionStore) this.#sessionStore = MemorySessionStore;
        const instance = new this.#sessionStore();
        if (!(instance instanceof SessionStore)) throw new Error("Must use the SessionStore.");
        return instance;
    }

    /**
     * @param {number} expireTime
     * @return {SessionFactory}
     */
    setExpireTime = (expireTime) => {
        SessionStore.expireTime = expireTime;

        return this;
    }

}

module.exports = SessionStoreRegister;