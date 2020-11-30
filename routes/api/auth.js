const express = require('express')
const router=express.Router()


// @route  GET api/auth
// @desc   Test
// @access Public (no jwt required)
router.get('/',(req,res)=>res.send('Auth Route'))

module.exports = router