const express = require('express')
const router = express.Router()


// GET /users/new -- render a form to create a new user
router.get('/new', (req,res)=>{
    res.send('show a new user form')
})


// POST /users -- create a new user in the db
router.post('/', (req,res)=>{
    res.send('create a new user in the db')
})


module.exports = router