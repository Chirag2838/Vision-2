const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.searchPeople = (req, res) => {

    console.log(req.body);
    for (key in req.body) {
        req.body = key;
    }
    console.log(req.body);

	if (req.body) {
        User.find({$or:[{'firstname': req.body}, {'lastname': req.body}, {'username': req.body}]}, (err, docs) => {
            if (err) {
                console.log(err);
            }
            else if (docs.length == 0) {
                res.json({success: false, message: 'No user Found'});
            }
            else {
                userList = [];
                for (let usersObj in docs) {
                    // console.log(docs[usersObj]);
                    userList.push(docs[usersObj].username);
                }
                console.log(docs[1].username);
                console.log(userList);
                res.json({success: true, message: 'Users found', userList: userList});
            }
        })
    }
    else {
        res.json({success: false, message: 'data insufficient'});
    }
}