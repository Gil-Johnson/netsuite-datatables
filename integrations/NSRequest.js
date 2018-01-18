var request2 = require('request');

module.exports = function(data, url) {

    request2({
        url: url,
        method: "POST",
        headers: {
            'Authorization': 'NLAuth nlauth_account=3860489_SB2, nlauth_email=restuser@lumeris.com, nlauth_signature=r5;Nvcbu',
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