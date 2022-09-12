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

// GET /users/login -- show a login form to the user
router.get('/login', (req,res) =>{
    res.render('users/login.ejs')
})
// POST /users/login -- accept a payload of form data and use it to log a user in
router.post('/login', (req,res)=>{
    console.log(req.body)
    res.send('log the user in')
})

// GET /users/logout -- log out a user by clearing the stored cookie
router.get('/logout', (req,res) =>{
    res.send('log the user out')
})
module.exports = router