const express = require('express')
const router=express.Router()


// @route  GET api/users
// @desc   Test
// @access Public (no jwt required)
router.get('/',(req,res)=>res.send('user Route'))

module.exports = router