'use strict';
var sql= require('mssql')
const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var fromDb={};

restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

				/*Connect ms sql*/
restService.get('/', function (req, res) {   
	
	// configure database
    var config = {
        user: 'mysqldb',
        password: 'mysqldb@123',
        server: 'blrblrps4.corp.capgemini.com', 
        database: 'sakila' 
    };
	
	 // connect to database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from actor', function (err, recordset) {
			if (err) console.log(err)
            // send records as a response
            res.send(recordset);
			//fromDb.value =recordset;
        });
    });
});

restService.listen((process.env.PORT || 8000), function() {
    
	console.log("Server up and listening");
    //console.log(fromDb.value);

});
