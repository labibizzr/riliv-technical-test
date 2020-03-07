const express = require('express');
const bodyParser = require('body-parser')

const app = express();
var jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000
// Database import
const db = require('./config/database')
const PRIVATEKEY = process.env.PRIVATE_KEY
// use json parser for all request
app.use(bodyParser.json())
// db authentication
db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


// middleware jwt

const jwtAuth = (req,res,next) => {
  
  var token = req.body.token

    if(token == null){
      res.status(400).json({message : "no Token in body"})
    }else{
      try{
        jwt.verify(token, PRIVATEKEY)
        
      }catch(err){
        res.status(400).json({Error : err})
      }
    }
    next()
}

app.get('/', (req, res) => {  
    res.send('Hello World!');
});

// generate token
app.get('/token', (req,res) => {
  var token = jwt.sign({ user: 'default' },PRIVATEKEY);
  res.json({ token : token})
})



app.use('/pelanggan', jwtAuth, require('./routes/pelanggans'))
app.use('/pesanan', jwtAuth,   require('./routes/pesanans'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    
});


//Run app, then load http://localhost:port in a browser to see the output.