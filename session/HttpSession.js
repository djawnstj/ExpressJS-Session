class HttpSession {

    /**
     * @type { Map<string, Object> }
     */
    #map
    #id

    constructor(id) {
        this.#map = new Map();
        if (id) this.#id = id;
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
    setAttribute = (name, attr) => {
        this.#map.set(name, attr);
    }

    /**
     * @return { Map<string, Object> }
     */
    getAllAttributes = () => {
        return [...this.#map];
    }

}

module.exports = HttpSession;