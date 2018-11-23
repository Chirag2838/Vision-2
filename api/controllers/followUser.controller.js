const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.followUser = (req, res) => {

	if (req.body.user1 && req.body.user2) {

		User.find({$and: [{'username': req.body.user1}, {'following': {$elemMatch: {'username': req.body.user2}}}]}, (err1, data1) => {

			if (err1) {

				console.log(err1);
			}

			else if (data1.length === 0) {

				User.findOneAndUpdate({'username': req.body.user1}, {$push: {'following': {'username': req.body.user2}}}, (err2, data2) => {

					if (err2) {

						console.log(err2);
					}

					else {

						User.findOneAndUpdate({'username': req.body.user2}, {$push: {'followers': {'username': req.body.user1}}}, (err3, data3) => {
							
							if (err3) {

								console.log(err3);
							}

							else {

								res.json({success: true, message: req.body.user1 + " started following " + req.body.user2});
							}
						});
					}
				});
			}

			else {
				
				User.findOneAndUpdate({'username': req.body.user1}, {$pull: {'following': {'username': req.body.user2}}}, (err4, data4) => {

					if (err4) {

						console.log(err4);
					}

					else {

						User.findOneAndUpdate({'username': req.body.user2}, {$pull: {'followers': {'username': req.body.user1}}}, (err5, data5) => {

							if (err5) {

								console.log(err5);
							}

							else {

								res.json({success: true, message: req.body.user1 + ' unfollowed ' + req.body.user2});
							}
						});
					}
				});
			}
		});
	}

	else {

		res.json({success: false, message: 'username not provided'});
	}
}