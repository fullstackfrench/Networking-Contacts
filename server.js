const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://franceska:xDSYJDaRJx9xlGQi@cluster2.vgzm5.mongodb.net/";
const dbName = "networking-contacts";

app.listen(8000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('contacts').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {contacts: result})
  })
})

app.post('/contacts', (req, res) => {
  db.collection('contacts').insertOne({name: req.body.name, email: req.body.email, company: req.body.company, role: req.body.role, comments: req.body.comments, emailed: 0, coffeeChat: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/contactsupdated', (req, res) => {
  db.collection('contacts').findOneAndUpdate({name: req.body.name, email: req.body.email, company: req.body.company, role: req.body.role, comments: req.body.comments}, { $set: {name: req.body.newName, email: req.body.newEmail, company: req.body.newCompany, role: req.body.newRole, comments: req.body.newComments }}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/emailed', (req, res) => {
  console.log(req.body)
  db.collection('contacts')
  .findOneAndUpdate({name: req.body.name, email: req.body.email, company: req.body.company, role: req.body.role, comments: req.body.comments}, {
    $inc: { emailed: 1 } 
    
  }, {
    returnDocument: 'after',
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })



})


app.put('/coffeechats', (req, res) => {
  console.log(req.body)
  db.collection('contacts')
  .findOneAndUpdate({name: req.body.name, email: req.body.email, company: req.body.company, role: req.body.role, comments: req.body.comments}, {
    $inc: { coffeeChat: 1 }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/contacts', (req, res) => {
  console.log('Delete is working!')
  db.collection('contacts').findOneAndDelete({name: req.body.name, email: req.body.email, company: req.body.company, role: req.body.role, comments: req.body.comments}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
