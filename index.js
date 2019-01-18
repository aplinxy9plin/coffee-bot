var NodeWebcam = require( "node-webcam" );
var express = require('express')
var app = express()
var request = require("request");
var fs = require('fs');
var $ = require("jquery");
var http = require("https");
var imgur = require('imgur');
var mysql = require('mysql')
var con = mysql.createConnection({
  host: "localhost",
  user: "top4ek",
  password: "q2w3e4r5",
  database: "smile_effect"
});
var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false

};
var Webcam = NodeWebcam.create( opts );
var stats = []
function createCapture(){
  NodeWebcam.capture( "my_picture", {}, function( err, data ) {
      if ( !err ){
          console.log( "Image created!" )
          // Setting
          imgur.setClientId('018ebfa932f27b1');
              // A single image
          imgur.uploadFile('my_picture.jpg')
              .then(function (json) {
                  // Replace <Subscription Key> with your valid subscription key.
                  const subscriptionKey = '<Subscription Key>';

                  // You must use the same location in your REST call as you used to get your
                  // subscription keys. For example, if you got your subscription keys from
                  // westus, replace "westcentralus" in the URL below with "westus".
                  // центральная южная часть сша
                  const uriBase = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

                  const imageUrl = json.data.link;

                  // Request parameters.
                  const params = {
                      'returnFaceId': 'true',
                      'returnFaceLandmarks': 'false',
                      'returnFaceAttributes': 'emotion'
                  };

                  var options = {
                      uri: uriBase,
                      qs: params,
                      body: '{"url": ' + '"' + imageUrl + '"}',
                      headers: {
                          'Content-Type': 'application/json',
                          'Ocp-Apim-Subscription-Key' : subscriptionKey
                      }
                  };

                  request.post(options, (error, response, body) => {
                    if (error) {
                      console.log('Error: ', error);
                      return;
                    }
                    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
                    console.log('JSON Response\n');
                    console.log(jsonResponse);
                    jsonResponse = JSON.parse(jsonResponse)
                    for (var i = 0; i < jsonResponse.length; i++) {
                      con.query("INSERT INTO `emotions`(`happy`, `sad`, `neutral`) VALUES ("+jsonResponse[i].faceAttributes.emotion.happiness+","+jsonResponse[i].faceAttributes.emotion.sadness+","+jsonResponse[i].faceAttributes.emotion.neutral+")", function (err, result, fields) {
                        console.log('created');
                      });
                    }
                  });
              })
              .catch(function (err) {
                  console.error(err.message);
              });

          setInterval(createCapture, 15000)
      } else {
          console.log(err);
      }
  });
}
createCapture()
app.listen(1337, function(){
  console.log('Server is running');
})


// var base64str = base64_encode('kitten.jpg');
