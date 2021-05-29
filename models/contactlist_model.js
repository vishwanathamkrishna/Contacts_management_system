'use strict'
const mongoose = require('mongoose');
const contactdetailsSchema = mongoose.Schema({
    

    name: { type: String, trim: true,
        lowercase: true, required: true,
        required: true,
    }, 
    email: { type: String, trim: true,
        lowercase: true, required: true,
        required: true,
    },
  phone: {
        type: String,
        require: true,
        trim: true,
    },

});

// First argument (contactlist) - model name
// second argument (contactdetailsSchema) - Schema variable name
// Third argument (contactlist) - collection name in mongodb database (contactDB)
const contactdetails = mongoose.model('contactlist', contactdetailsSchema, 'contactlist');
module.exports = contactdetails;