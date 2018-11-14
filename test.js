var imgur = require('imgur');
var request = require('request')
// Setting
imgur.setClientId('018ebfa932f27b1');
    // A single image
imgur.uploadFile('img.jpg')
    .then(function (json) {
        // Replace <Subscription Key> with your valid subscription key.
        const subscriptionKey = '4e4286d7b1cd4989868725a00664c633';

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
        });
    })
    .catch(function (err) {
        console.error(err.message);
    });
