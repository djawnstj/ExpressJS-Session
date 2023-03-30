const HttpSession = require("./HttpSession");
const RedisSessionStore = require("./RedisSessionStore");

class RedisSession extends HttpSession {

    /**
     * @type { Map<string, Object> }
     */
    #map
    #id
    #fun

    constructor(id, fun, map) {
        super();
        this.#map = new Map();
        if (id) this.#id = id;
        if (fun && (typeof fun === "function")) this.#fun = fun;
        if (map) this.#map = map;
    }

    /**
     * @param { string } name
     * @return { Object }
     */
    getAttribute = (name) => {
        return this.#map.get(name);
    }

    /**
     * @param { string } name
     * @param { Object } attr
     * @return { void}
     */
    setAttribute = async (name, attr) => {
        this.#map.set(name, attr);
        await this.#fun(this.#id, this.#map);
    }

    /**
     * @return { Map<string, Object> }
     */
    getAllAttributes = () => {
        return [...this.#map];
    }

}

module.exports = RedisSession;