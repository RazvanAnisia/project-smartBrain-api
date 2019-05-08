const handleRegister = (req,res, db, bcrypt) =>{
   //get the variables from the req.body
  const {name, email, password} = req.body;
  if(!email ||! name || !password){
    return  res.status(400).json('incorrect form submission')
  }
  const hash = bcrypt.hashSync(password);
      //create a transaction
      // we get the trx parameter that we can use instead of db ,
      // to make sure whatever we do is a transaction
      db.transaction(trx =>{
        //insert the hash and email in the login table.
        trx.insert({
          hash:hash,
          email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            //enter the new information in the database
        return trx('users')
          .returning('*') 
          .insert({
            email:loginEmail[0],
            name:name,
            joined:new Date()
           
          })
          .then(user =>{
            //always remember to respond
          res.json(user[0])
          
          })
          //if all these pass then COMMIT
          .then(trx.commit)
          .catch(trx.rollback)
          })
        .catch(err =>res.status(400).json('unable to register'))
      })
}

module.exports = {
  handleRegister:handleRegister
}