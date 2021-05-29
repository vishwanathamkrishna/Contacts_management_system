const mongoose = require('mongoose');

// MongoDB URL to connect to database 
const mongodb_url = 'mongodb://127.0.0.1:27017/contactDB'


// Connecting to mongoDB using mongoose npm library
mongoose.connect( mongodb_url, 
    { useNewUrlParser: true }).then(()=>{
        console.log("Connected to Database")
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    })