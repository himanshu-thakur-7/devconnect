const express = require('express')
const router=express.Router()
const auth= require('../../middleware/auth')
const Profile=require('../../models/Profile')
const User=require('../../models/User')
const validator=require('validator')
const { route } = require('./auth')

// @route  GET api/profile/me
// @desc   get current users profile
// @access Private (jwt required)
router.get('/me',auth,async (req,res)=>{

    try{

        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar'])

        if(!profile){
         return   res.status(400).json({msg:'There is no profile for this user'})
        }

        res.json(profile)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

// @route  POST api/profile
// @desc   set current user profile
// @access Private (jwt required)
router.post('/',auth, async (req,res)=>{
   
    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    }=req.body;

    



    const isError= validator.isEmpty(skills||'') || validator.isEmpty(status || '')
     if(isError)
     {
         return res.status(400).send('Skills / status cant be empty')

     }

    // build profile object
     const profileFields={}
     profileFields.user = req.user.id;
     if(company) profileFields.company=company
     if(website) profileFields.website=website
     if(location) profileFields.location=location
     if(bio) profileFields.bio=bio
     if(status) profileFields.status=status
     if(githubusername) profileFields.githubusername=githubusername
     if(skills) profileFields.skills=skills.split(',').map((skill)=>skill.trim())

     console.log(profileFields.skills)
     
     // build social object
     profileFields.social = {}
     if (youtube) profileFields.social.youtube=youtube
     if (twitter) profileFields.social.twitter=twitter
     if (facebook) profileFields.social.facebook=facebook
     if (linkedin) profileFields.social.linkedin=linkedin
     if (instagram) profileFields.social.instagram=instagram

     try{
     let profile=await Profile.findOne({user: req.user.id})

     if (profile){
         profile=await Profile.findOneAndUpdate(
            { user: req.user.id},
            {
              $set: profileFields
            },
            {
                new: true,
            }

         )
        return res.json(profile)
     }
     // create
     profile=new Profile(profileFields)
     await profile.save()
     return res.json(profile)
     }
     catch(err){
         console.error(err)
         res.status(500).send('Server Error')
     }
     
     


 

    
})



module.exports = router