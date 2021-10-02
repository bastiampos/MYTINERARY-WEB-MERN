const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then( () => console.log('database connected'))
.catch(error => console.log(error))