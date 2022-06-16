const fs = require('fs')
const path = require('path')


const read = filename => {
    let data = fs.readFileSync(path.join(__dirname, '../', 'database', `${filename}.json`), 'utf-8')
    return JSON.parse(data)
}

const write = (filename, data) => {
    fs.writeFileSync(path.join(__dirname, '../', 'database', `${filename}.json`), JSON.stringify(data, null, 4))
}

module.exports = {
    read,
    write
}