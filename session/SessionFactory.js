const SessionStore = require("./SessionStore");
const MemorySessionStore = require("./MemorySessionStore");
const config = require("../config/config");

class SessionFactory {

    /**
     @type { SessionStore }
     */
    #sessionStore;


    /**
     * @param {SessionStore|{}} [type=MemorySessionStore]
     */
    constructor(type = MemorySessionStore) {
        if (typeof type !== "function") throw new Error("Must use the constructor.");
        const temp = new type();
        if (!(temp instanceof SessionStore)) throw new Error("Must use the SessionStore.");
        this.#sessionStore = temp;
    }

    /**
     * @param { string } key
     * @param { Response } res
     * @param { boolean } status
     * @returns { HttpSession }
     */
    getSession = async (key, res, status) => {
        return await this.#sessionStore.getSession(key, res, status);
    }

    /**
     * @param { string } key
     */
    removeSession = async (key) => {
        return await this.#sessionStore.removeSession(key);
    }

}

const sessionFactory = new SessionFactory(config.sessionStore);

module.exports = sessionFactory;