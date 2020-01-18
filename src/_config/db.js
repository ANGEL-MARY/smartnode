const mongoose = require('mongoose')

const dbName = process.env.DBNAME
const dbPort = process.env.DBPORT
const dbAddress = process.env.DBADDRESS
try {
    mongoose.connect(`mongodb://${dbAddress}:${dbPort}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Nice! Database looks fine')
} catch (e) {
    console.log(e)
}
