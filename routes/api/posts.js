const express = require('express')
const router=express.Router()


// @route  GET api/posts
// @desc   Test
// @access Public (no jwt required)
router.get('/',(req,res)=>res.send('post Route'))

module.exports = router