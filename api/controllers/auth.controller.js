const mongoose = require('mongoose');
const User  = mongoose.model('User');

module.exports.signup = (req, res) => {
    if (req.body.pass1 == req.body.pass2) {
        User.findOne({'email': req.body.email}, (err1, user1) => {
            if (!user1) {
                User.findOne({'username': req.body.username}, (err2, user2) => {
                    if(!user2) {
                        const user = new User({
                            'firstname': req.body.firstname,
                            'lastname': req.body.lastname,
                            'email': req.body.email,
                            'username': req.body.username,
                            'password': req.body.pass1
                        });
                        user.save((err3, data) => {
                            console.log('welcome to vision');
                            res.json({success: true, message: 'Welcome to Vision', data: data});
                        })
                    }
                    else {
                        res.json({success: false, message: 'Username already exists'});
                    }
                })
            }
            else {
                res.json({success: false, message: 'Email already exists'});
            }
        })
    }
    else {
        res.json({success: false, message: 'password did not match'});
    }
}


module.exports.signin = (req, res) => {
    User.findOne({$or:[{'email': req.body.id}, {'username': req.body.id}]}, (err1, user) => {
        if (user) {
            if(user.password == req.body.password) {
                res.json({success: true, message: 'Successfully Signed in', data: user});
            }
            else {
                res.json({success: false, message: 'password incorrect'});
            }
        }
        else {
            res.json({success: false, message: 'User not found'});
        }
    })
}