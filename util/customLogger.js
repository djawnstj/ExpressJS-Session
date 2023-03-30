const customLogger = {


    isDebug: false,
    debug: (msg) => {
        if (this.isDebug) console.log(msg)
    },
    error: (msg) => {
        if (this.isDebug) console.error(msg)
    },
    info: (msg) => {
        if (this.isDebug) console.log(msg)
    }
}

module.exports = customLogger;