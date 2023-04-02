const SessionStore =  require("./SessionStore");
const HttpSession =  require("./HttpSession");
const UUID = require("../util/UUID");

class MemorySessionStore extends SessionStore {

    #map;

    constructor() {
        super();
        this.#map = new Map();
    }


    /**
     * @return { string }
     */
    #createSession = () => {
        const key = UUID.randomUUID();
        const session = new HttpSession();
        this.#saveSession(key, session)
        return key;
    }

    /**
     * @param { string } key
     * @param { HttpSession } session
     */
    #saveSession = (key, session) => {
        this.#map.set(key, session);
    }

    /**
     * @param { string } key
     * @param { Response } res
     * @param { boolean } status
     * @returns { HttpSession }
     */
    getSession = (key, res, status = true) => {

        let session;

        if (key) session = this.#map.get(key);

        if (!session && status) {
            key = this.#createSession();
            session = this.#map.get(key);

            res.cookie(SessionStore.sessionKey, key);
        }

        return session;

    }

    /**
     * @param { string } key
     */
    removeSession = (key) => {
        this.#map.delete(key);
    }

}

module.exports = MemorySessionStore;