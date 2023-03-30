const SessionStore = require("./SessionStore");
const HttpSession = require("./HttpSession");
const redis = require("redis");
const customLogger = require("../util/customLogger");
const UUID = require("../util/UUID");
const RedisSession = require("./RedisSession");
const config = require("../config/config");

class RedisSessionStore extends SessionStore {

    #client;
    static #instance;

    constructor() {
        super();

        if (!RedisSessionStore.#instance) {
            RedisSessionStore.#instance = this;

            this.#client = redis.createClient({
                socket: {
                    port: 6379,
                    host: "172.23.240.1"
                }
            });

            this.#client.on("connect", () => {
                customLogger.debug("Redis Client Connected!")
            });

            this.#client.on("error", (err) => {
                customLogger.error("RedisSessionStore Client Connect Error." + err)
            });

            this.#client.connect().then();
        }

        return RedisSessionStore.#instance;
    }

    /**
     * @return { string }
     */
    #createSession = async () => {
        const session = new HttpSession();

        const key = UUID.randomUUID();

        const allAttr = session.getAllAttributes();
        await this.#saveSession(key, allAttr);

        return key;
    }

    /**
     * @param { string } key
     * @param { Map } sessionAttr
     */
    #saveSession = async (key, sessionAttr) => {

        const s = JSON.stringify([...sessionAttr]);

        await this.#client.multi()
            .set(key, s)
            .expire(key, 10)
            .exec();
    }


    /**
     * @param { string } key
     * @param { Response } res
     * @param { boolean } status
     * @returns { Promise }
     */
    getSession = async (key, res, status) => {
        let obj;

        if (key) obj = await this.#client.get(key, (err) => {
                customLogger.error("RedisSessionStore getAttribute error: " + err)
            });

        if (!obj && status) {
            key = await this.#createSession();
            obj = await this.#client.get(key, (err) => {
                customLogger.error("RedisSessionStore getAttribute error: " + err)
            });

            res.cookie(config.sessionKey, key);
        } else if (!obj && !status) {
            res.clearCookie(config.sessionKey);
            return null;
        }

        await this.#client.multi()
            .expire(key, config.EXPIRE_TIME)
            .exec();

        obj = JSON.parse(obj);
        const map = new Map(obj.map(([mapKey, mapValue]) => [mapKey, mapValue]));

        return new RedisSession(key, this.#saveSession, map);
    }

    /**
     * @param { string } key
     */
    removeSession = (key) => {
        this.#client.del(key, (err) => {
            customLogger.error("RedisSessionStore removeSession error: " + err)
        });
    }

}

module.exports = RedisSessionStore