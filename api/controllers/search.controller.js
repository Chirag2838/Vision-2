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
                console.log(docs);
                usersList = [];
                for (let usersObj in docs) {
                    // console.log(docs[usersObj]);
                    usersList.push(docs[usersObj].username);
                }
                // console.log(docs[0].username);
                console.log(usersList);
                res.json({success: true, message: 'Users found', usersList: usersList});
            }
        })
    }
    else {
        res.json({success: false, message: 'data insufficient'});
    }
}