

// init server
var express = require('express');
var app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Thu, 01 Jan 1970 00:00:00 GMT

app.get("/api", function (req, res) {
  res.json({ unix: new Date().getTime() });
});

app.get("/api/:date", function (req, res) {


    const date = new Date(req.params.date);
    const utc = moment(date).utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]');
    const unix = date.getTime();

   isNaN(unix) ? res.json({error: 'Invalid Date'}) : res.json({utc: utc,unix: unix });

  


});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
