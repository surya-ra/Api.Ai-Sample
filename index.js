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
				/*Post request to bot*/
restService.post('/echo', function(req, res) {
   
   var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
   console.log(speech);
   return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    
	console.log("Server up and listening");
    //console.log(fromDb.value);

});
