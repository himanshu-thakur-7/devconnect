const express = require('express')
const router=express.Router()
const auth=require('../../middleware/auth')
const User = require('../../models/User')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')

const validator=require('validator')

// @route  GET api/auth
// @desc   login and authorization
// @access private
router.get('/',auth,async(req,res)=>{

   try{
    
    const user=await User.findById(req.user.id).select('-password')
    res.json(user)
   }
   catch(err){
   console.log(err.message)
   res.status(401).json({err:err.message})
   }

})
// @route  POST api/users
// @desc   Register user
// @access Public (no jwt required)
router.post('/',async (req,res)=>{
    const {email,password}=req.body
    const iserror=!validator.isEmail(email || '') || !validator.isLength(password || '',1)
    // const iserror=false
    if (iserror){
        return res.status(400).send('Error')
    }

    try{
    
    let user= await User.findOne({email})
    if (!user){
     return   res.status(400).send('Invalid credentials')
    }
    
   // match passwords
   const isMatch = await bcrypt.compare(password,user.password)

    if (!isMatch){
     return   res.status(400).send('Invalid credentials')
    }




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
