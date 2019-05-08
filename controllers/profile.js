const handleProfile = (req,res,db) => {
  //get the id from the url
    const {id} = req.params;
    db.select("*").from('users')
    .where({
      id:id
    })
    .then(user => 
      //if there is a user with that id
       {
         if(user.length){
         //respond with the user
          res.json(user[0])
          }else{
            res.status(400).json('Not found')
          }
        }
      )
      .catch(err =>  res.status(400).json('User not found'))
}

module.exports ={
  handleProfile:handleProfile
}