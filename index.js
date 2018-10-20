const Telegraf = require('telegraf')
const bot = new Telegraf('716766047:AAE-osEiU1OQLxwPsCivPiBLR826DHL_enU')
var NodeWebcam = require( "node-webcam" );
var express = require('express')
var app = express()
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
app.get('/', (req, res) => {
  NodeWebcam.capture( "my_picture", {}, function( err, data ) {
      if ( !err ){
          console.log( "Image created!" )
          bot.telegram.sendMessage("@coffee_ctf", "Кофе почти готов")
          bot.telegram.sendPhoto(
              "@coffee_ctf", {
                source: "./my_picture.jpg"
             }
          );
          res.send('Success')
      } else {
          console.log(err);
      }
  });
})

app.listen(1337, function(){
  console.log('Coffee bot is running');
})
