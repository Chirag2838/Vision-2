const mongoose = require('mongoose');
const User  = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports.signup = (req, res) => {
    for (key in req.body) {
        req.body = JSON.parse(key);
    }
    console.log(req.body);
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
                            console.log('saving', data);
                            if (err3) {
                                console.log(err3);
                            }
                            else {
                                var token = jwt.sign(data.toJSON(), 'secretKey',{
                                    expiresIn : 86400
                                });

                                console.log(token);
                                User.findOneAndUpdate({'email': data.email}, {$set:{'token': token}}, {new: true}, (err4, doc) => {
                                    if(err4) {
                                        console.log('err4', err4);
                                    }
                                    else {
                                        console.log(doc);
                                        res.json({
                                            success: true, 
                                            message: 'successfully signed up', 
                                            token: token, 
                                            username: user.username, 
                                            email:user.email, 
                                            userId: user._id, 
                                            blogCategory: user.blogCategory
                                        });
                                    }
                                }) 
                            }
                        })
                    }
                    else {
                        res.json({success: false, message: 'Username already exists', token: null, blogCategory: null});
                    }
                })
            }
            else {
                res.json({success: false, message: 'Email already exists', token: null, blogCategory: null});
            }
        })
    }
    else {
        res.json({success: false, message: 'password did not match', token: null, blogCategory: null});
    }
}


module.exports.signin = (req, res) => {
    console.log(req.body);
    for (key in req.body) {
        req.body = JSON.parse(key);
    }
    console.log(req.body);
    User.findOne({$or:[{'email': req.body.id}, {'username': req.body.id}]}, (err1, user) => {
        if (user) {
            if(user.password == req.body.password) {
                const token = jwt.sign(user.toJSON(), 'secretKey',{
                    expiresIn : 86400
                });

                // console.log(token);

                User.findOneAndUpdate({'email': user.email}, {$set:{'token': token}}, {new: true}, (err, doc) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                        res.json({
                            success: true, 
                            message: 'Successfully Signed in', 
                            token: token, 
                            email: user.email, 
                            username: user.username, 
                            userId: user._id, 
                            blogCategory: user.blogCategory
                        });
                    }
                })
            }
            else {
                res.json({success: false, message: 'password incorrect', token: null, blogCategory: null});
            }
        }
        else {
            res.json({success: false, message: 'User not found', token: null, blogCategory: null});
        }
    })
}