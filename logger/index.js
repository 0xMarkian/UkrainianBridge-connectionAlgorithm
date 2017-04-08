import fs from 'fs'

const logFile = `${__dirname}/logFile.txt`

export default (text) => {
  fs.appendFileSync(logFile, `${new Date()}; ${text}\n\n`)
}
