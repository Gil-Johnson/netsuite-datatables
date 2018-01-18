var express = require("express");
var app = express();
var sql = require("mssql");
var bodyParser = require("body-parser");
var moment = require('moment');
var config = require("./integrations/config");
var sendNSRequest = require("./integrations/NSRequest");
var cleanseData = require("./integrations/cleanseData");
var R = require('ramda');
var _ = require('lodash');
var S = require('string');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/claims', function(req, res) {
    
    console.log("params", req.query.memberid);
    console.time('DBPull');
    
        sql.connect(config.factes, function(err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        
        
         request.query('select CLCL_ID, CLCL_CUR_STS, CLCL_INPUT_DT, CLCL_TOT_CHG, CLCL_TOT_PAYABLE, CLCL_PAID_DT FROM Claims WHERE MEME_CK = ' + req.query.memberid, function (err, recordset) {
         recordset["recordtype"] = "members";  
         
              if (err) console.log(err)
              var claims = cleanseData(recordset); 
           
              res.json(claims);
             
          sql.close();

         }); // finished with member records       
    
        });
        
}); //app.get

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!!");
});