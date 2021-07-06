var mongoose = require('mongoose');
var dburl = 'mongodb+srv://amit1234:amit1234@cluster0.vcsdf.mongodb.net/test?retryWrites=true';
//mongodb+srv://amit1234:amit/@1234@cluster0.vcsdf.mongodb.net/test
// var dburl = 'mongodb://chirag:chirag123@cluster0-shard-00-00-byhyr.mongodb.net:27017,cluster0-shard-00-01-byhyr.mongodb.net:27017,cluster0-shard-00-02-byhyr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){

	console.log('mongoose connected to ' + dburl);

});

mongoose.connection.on('disconnected', function(){

	console.log('mongoose disconnected');

});

mongoose.connection.on('error', function(err){

	console.log('mongoose connection error' + err);

});