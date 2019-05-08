const handleSignin = (req, res, db, bcrypt) =>{
  const{email , password} = req.body;
  if(!email ||!password){
    return  res.status(400).json('incorrect form submission')
  }
  db.select('email','hash').from('login')
  //find the email corresponding to the one from the request
  .where('email','=',email )
  //check the password
  .then(data =>{
    //compare with bcrypt the password from the req body to the one from the database
    const isValid =  bcrypt.compareSync(password,data[0].hash)
    if(isValid){
      //always want to make sure we return this
      return db.select('*').from('users')
      .where('email', '=', email)
      .then(user =>{
        res.json(user[0])
      })
      .catch(err =>res.status(400).json('unable to get user'))
     
    }else{
      res.status(400).json('wrong credentials')
    }
    
  })
  .catch(err => res.status(400).json('wrong credentials'))
}

module.exports ={
  handleSignin:handleSignin
}