const url = process.env.MONGODB_URI
const dbName = 'heroku_42fh9g7w'
const collectionName = 'userData'
var mungu = require('mungu')
async function connect(resolve){
    var storage = await mungu({
    url,
    dbName,
    collectionName,
  })
  console.log('mungu connected')
  resolve(storage)
}

module.exports = new Promise ((resolve) => {
    connect(resolve)
}) 