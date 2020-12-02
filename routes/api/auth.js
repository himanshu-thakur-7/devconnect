const express = require('express')
const router=express.Router()
const auth=require('../../middleware/auth')
const User = require('../../models/User')

// @route  GET api/auth
// @desc   Test
// @access Protected(jwt required)
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

module.exports = router
