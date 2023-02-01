import Axe from "axe"
import Cabin from "cabin"
import pc from "picocolors"
const worker = require('node:worker_threads');

const axe = new Axe()

const cabin = new Cabin({
    logger: axe
})

const threadId = worker.threadId == 0 ? "" : `[${worker.threadId}]`

class Logger {
    public trace(message, metadata: {} = {}) {
        cabin.trace(`${threadId}${message}`, metadata)
    }

    public debug(message, metadata: {} = {}) {
        cabin.debug(`${threadId}${message}`, metadata)
    }

    public info(message, metadata: {} = {}) {
        cabin.info(`${threadId}${message}`, metadata)
    }

    public event(message, metadata: {} = {}) {
        cabin.info(pc.blue(`${threadId}${message}`), metadata)
    }

    public success(message, metadata: {} = {}) {
        cabin.info(pc.green(`${threadId}${message}`), metadata)
    }

    public warn(message, metadata: {} = {}) {
        cabin.warn(pc.yellow(`${threadId}${message}`), metadata)
    }

    public error(message, metadata: {} = {}) {
        cabin.error(pc.red(`${threadId}${message}`), metadata)
    }

    public fatal(message, metadata: {} = {}) {
        cabin.fatal(pc.bgRed(`${threadId}${message}`), metadata)
    }
}
const logger = new Logger()

export {
    axe,
    logger
}