const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// load Users model
require('../models/Users');
const Users = mongoose.model('users');

// Users Login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// users register Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

// login Form post
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// register Form post
router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'passwords do not match!' });
    }

    if (req.body.password.length < 4) {
        errors.push({ text: 'password should be at least 4 characters' });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        
        Users.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                req.flash('error_msg', 'Email already registered');
                res.redirect('/users/login');
            } else {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }
                bcrypt.genSalt(10, (err, salt) => {
        
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
        
                        new Users(newUser)
                            .save()
                            .then(user => {
                                req.flash('success_msg', 'you are now registered');
        
                                res.redirect('/users/login');
                            }).catch(err => {
                                console.log(err);
                                return;
                            });      
                    });   
                    if (err) console.log(err);
                });
            }
        });
    }
});


// logout user
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');  
});


module.exports = router;