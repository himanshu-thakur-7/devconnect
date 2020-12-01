const express = require('express')
const router=express.Router()
const {check,validationresult}=require('express-validator')
const validator=require('validator')
// @route  POST api/users
// @desc   Register user
// @access Public (no jwt required)
router.post('/',(req,res)=>{
    const iserror=validator.isEmpty(req.body.name || '') || !validator.isEmail(req.body.email || '') || !validator.isLength(req.body.password || '',6,34)
    // const iserror=false
    if (iserror){
        return res.status(400).send('Error')
    }
    console.log(req.body)
    res.send('user Route')
    

}

)

module.exports = router