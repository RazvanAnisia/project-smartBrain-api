const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require("./controllers/profile");
const image = require('./controllers/image');


//Middleware
app.use(bodyParser.json());
app.use(cors());

//Root 
app.get('/', (req,res)=>{
  res.json('it is working')
})

//Signing
app.post('/signin', (req,res)=>{signin.handleSignin(req , res, db, bcrypt)} )
 
//Register
app.post('/register' , (req,res) =>{register.handleRegister(req, res, db, bcrypt)})

//Get profile
// app.get('/profile/:id', (req,res) =>{profile.handleProfile(req, res, db)})

//Update
app.put('/image',(req,res) =>{image.handleImage(req,res,db)}) ;
//clarifai
app.post('/imageURL',(req,res) =>{image.handleApiCall(req,res)}) 

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Server is running')
})

/*
Root - / - this is working
  /signin  --> POST request, it will respond with success/fail
  /register --> POST request, add data to the database, 
we will return the new created user to make sure everything is working
  /profile/:userId --> GET request,
to access the profile of a the user on the homescreen
Because we are working with ranking,and counting the number of times a user
is submitting photos, we need a var to keep score to check the rank of other users
  /image --> PUT -so we are updating the score, this will return the updated
  user object
*/