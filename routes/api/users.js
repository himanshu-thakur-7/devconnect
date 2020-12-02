const express = require('express')
const router=express.Router()
const validator=require('validator')
const User=require('../../models/User')
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
// @route  POST api/users
// @desc   Register user
// @access Public (no jwt required)
router.post('/',async (req,res)=>{
    const {name,email,password}=req.body
    const iserror=validator.isEmpty(name || '') || !validator.isEmail(email || '') || !validator.isLength(password || '',6,34)
    // const iserror=false
    if (iserror){
        return res.status(400).send('Error')
    }

    try{
    
    let user= await User.findOne({email})
    if (user){
     return   res.status(400).send('Error User Exists')
    }
    const avatar= gravatar.url(email,{
     s:'200',//size
     r:'pg',//rating
     d:'mm'//default image icon
    })
     user=new User({
        name,
        email,
        avatar,
        password
    })

    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(password,salt)

   await user.save()

   const payload={
       user:{
           id: user.id
       }
   }
   jwt.sign(payload,config.get('jsonSecretKey'),
   
   {expiresIn:360000},
   (err,token)=>{
     if (err) throw err;
     res.json({token})
   }
   )



// return jsonWebToken
}
catch(err){
  console.error(err.message)
  res.status(500).send('Server Error')

}




    

}

)

module.exports = router