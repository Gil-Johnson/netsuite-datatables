var request2 = require('request');

module.exports = function(data, url) {

    request2({
        url: url,
        method: "POST",
        headers: {
            'Authorization': 'NLAuth nlauth_account={NS Account #}, nlauth_email= {restuser@netsuite.com}, nlauth_signature={password}',
            'content-type': 'application/json'
        },
        json: true,
        body: data
    }, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', body); // Print the HTML for the Google homepage. 

    });
}
