const express = require('express')
const router = express.Router()
const db = require('../models')


// GET /users/new -- render a form to create a new user
router.get('/new', (req,res) =>{
    res.render('users/new.ejs')
})


// POST /users -- create a new user in the db
router.post('/', async (req,res)=>{
    try {
        const newUser = await db.user.create(req.body)
        //store the new user's id as a cookie
        // res.cookie('key', value)
        res.cookie('userId', newUser.id)
        //redirect to the homepage
        res.redirect('/')
    } catch(err) {
        console.log(err)
        res.send('server error')
    }
})


module.exports = router