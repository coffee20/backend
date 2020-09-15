// Mongoose connection
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("MongoDB Connected!"))
    .catch(e => console.error(e));
