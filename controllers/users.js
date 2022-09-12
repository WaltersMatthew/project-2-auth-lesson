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
        res.redirect('/users/profile')
    } catch(err) {
        console.log(err)
        res.send('server error')
    }
})

// GET /users/login -- show a login form to the user
router.get('/login', (req,res) =>{
    console.log(req.query)
    res.render('users/login.ejs', {
        //if req.query message exists, pass the message, otherwise pass in null
        //ternary operator
        //condition ? expression if truthy : expression if falsy
        message: req.query.message ? req.query.message : null
    })
})
// POST /users/login -- accept a payload of form data and use it to log a user in
router.post('/login', async (req,res)=>{
    try{
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const noLoginMessage = 'Incorrect username or password'
        // look up user in the db using spplied email
        //if user is not found -- send them back to login form
        if(!user) {
            console.log('user not found')
            res.redirect('/users/login?message=' + noLoginMessage)
        //if the user is found but has wrong password -- send back to login form
        } else if (user.password !== req.body.password){
            console.log('wrong password')
            res.redirect('/users/login?message=' + noLoginMessage)
        //if user is found and supplied pw matches what's in the db -- log in
        }else {
            console.log('logging the user in')
            res.cookie('userId', user.id)
            res.redirect('/users/profile')
        }
    }catch(err){
        console.log(err)
        res.send('server error')
    }
})

// GET /users/logout -- log out a user by clearing the stored cookie
router.get('/logout', (req,res) =>{
    // clear the cookie
    res.clearCookie('userId')
    //redirect to home page
    res.redirect('/')
})

router.get('/profile', (req,res)=>{
    //if user is not logged...redirect
    if(!res.locals.user){
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource')
    }else{
        res.render('users/profile.ejs', {
            user: res.locals.user
        })
    }
})

module.exports = router