var request = require('request');
var headers = {
    'Authorization': 'Bearer 6c4c87bdc14ae7ca267c1f4c7e206eb446de72cd',
    'Content-Type': 'application/json'
};

var dataString = '{ "long_url": "https://siddhyaRish.com" }';

var options = {
    url: 'https://api-ssl.bitly.com/v4/shorten',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var url = JSON.parse(body)
        console.log("Inner ", url.link);
    }
    console.log("Outer", body.id)
}

request(options, callback);
// request.post("https://api-ssl.bitly.com/v4/shorten" , {headers : {
//     "Authorization" : "Bearer "
// }})
