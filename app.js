const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8900;
const app = express();
const db = require('./db');
const contact_list = require('./models/contactlist_model');

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Data from MongoDB database and display on start page (index page)
app.get('/', (req,res)=>{
    contact_list.find({}).exec((err,data)=>{
        if (err)
        {
            console.log(err)
        }
        const result = data
        console.log("contacts : ", result)
        res.render('index.ejs',{data:result})
    })
})

// Post data of the contact from the User interface
app.post('/addData', (req,res) => {           
    const contact = new contact_list({...req.body })
    contact.save(
        (err, data) => {
        if(err) return res.status(500).send('There was a problem adding the contact')
        console.log(`Inserted ... ${data} `)
        res.redirect('/');
    })
});


// Delete Selected Contact from the contact list
app.delete('/delete_contact', (req,res)=>{
    const name = req.body.name;
    console.log("Contact deleted with name : ", name)
    contact_list.findOneAndDelete({"name": name}, (err,result)=>{
        if(err) return res.status(500).send(err)
        res.send({message: 'deleted ...'})
        console.log(result)
    })
})


// Finding contact by name 
app.post('/find_by_name', (req,res)=>{
    const name = req.body.name;
    // console.log("/find_by_name : name : ", name)
    contact_list.find({name:name}, (err,result)=>{
        if(err) throw err;
        res.send(result) 
    })
});


// Update Contact using Modal form 
app.put('/update_contact', (req,res)=>{
    const name = req.body.name
    console.log("/update_contact : name : ", name)
    contact_list.findOneAndUpdate({"name": name},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone
          }
    },{
        upsert: true
    }, (err,result)=>{
        if(err) return res.send(err)
        res.send(result)
    }) 
})

// Opening Add User page
app.get('/addContact',(req,res) => {
    res.render('admin')
})


// Starting server which is listening to port number 8900
app.listen(port, (err) => {
	if (err)
		throw err;
	console.log(`Server has started and listening on port ${port}...`);
});