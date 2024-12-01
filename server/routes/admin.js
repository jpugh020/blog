const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');


const adminLayout = '../views/layouts/admin.ejs'

router.get('/admin', async (req, res) => {

    

    
    try{

        const locals = {
            title: "Admin",
            description: "Simple blog with Node.js, express, and MongoDB"
        }
    
        const data = await Post.find();
        res.render('admin/index', {locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
    
    
});


//POST == ADMIN CHECK LOGIN

router.post('/admin', async (req, res) => {
    try{
        const {username, password} = req.body;
        if(req.body.username === 'admin' && req.body.password == 'password') {
            res.send("You are logged in.");
        } else {
            res.send("Wrong username/ password");
        }

        res.redirect('/admin');
        
    } catch (error) {
        console.log(error);
    }
});

//Router POST == Register

router.post('/register', async (req, res) => {
    try{
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword});
            res.status(201).json({message: "User Created", user});

        } catch (error) {
            if(error.code=== 11000) {
                res.status(409).json({message: "User already in use"});
            }
            res.status(500).json({message: "Internal server error"});
        }

        
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;