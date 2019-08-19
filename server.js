const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://casper:casper123@cluster0-plvgn.mongodb.net/casper_bd?retryWrites=true&w=majority', {useNewUrlParser: true});

app.listen(port, () => {
    console.log('Listening on port 3000');
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));


// ENDPOINTS

app.get('/webhook', (req, res) => {
    if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'chatbotteste') {
        res.status(200).send(req.query['hub.challenge']);
    }else {
        res.sendStatus(403);
    };
});

app.post('/webhook', (req, res) => {
    let data = req.body;
    if (data.object === 'page') { 
        data.entry.forEach((entry) => {
            entry.messaging.forEach(
              (event) => {
                if (event.message) {
                    treatMessage(event);
                }
              }
            );
        });
    };
    res.sendStatus(200);
});


// Functions

  
function treatMessage (event) {
    let senderID = event.sender.id;
    let message = event.message;
    let messageText = message.text;
    let attachments = message.attachments;

    if(messageText) {
        switch(messageText.toUpperCase()){
            case 'OI' || 'OLÁ' || 'OLA':
                callSendAPI(senderID, "Olá, que temas de notícias você deseja?");
                
                break;
            case 'TCHAU':
                callSendAPI(senderID, "Até logo");

                break;

            case 'ESPORTES':
                callSendAPI(senderID, "Aqui aparecem as noticias sobre esportes");
                sendCarrossel(senderID);
                break;

            case 'POLÍTICA':
                callSendAPI(senderID, "Aqui aparecem as noticias sobre política");
                sendCarrossel(senderID);
                break;

            case 'ENTRETENIMENTO':
                callSendAPI(senderID, "Aqui aparecem as noticias sobre entretenimento");
                sendCarrossel(senderID);
                break;

            case 'FAMOSOS':
                callSendAPI(senderID, "Aqui aparecem as noticias sobre famosos");
                sendCarrossel(senderID);
                break;
            
            default:
                callSendAPI(senderID, "Desculpa, mas eu não entendi o que voce disse!!");
                callSendAPI(senderID, "Por favor escolha um tema valido!");

                break;
        };
    };

};


function sendCarrossel (senderID) {
  var request_body = {
    "recipient": {
      "id": senderID
    },
    "message":{
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title":"Welcome!",
              "image_url":"https://dmp0bw3rmgwlj.cloudfront.net/catalog/product/r/1/r11_teastain_a_1.jpg",
              "subtitle":"We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://www.google.com/",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.google.com/",
                  "title":"View Website"
                },              
              ]
            },{
              "title":"Welcome!",
              "image_url":"https://dmp0bw3rmgwlj.cloudfront.net/catalog/product/r/1/r11_teastain_a_1.jpg",
              "subtitle":"We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://www.google.com/",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.google.com/",
                  "title":"View Website"
                },              
              ] 
            },{
              "title":"Welcome!",
              "image_url":"https://dmp0bw3rmgwlj.cloudfront.net/catalog/product/r/1/r11_teastain_a_1.jpg",
              "subtitle":"We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://www.google.com/",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.google.com/",
                  "title":"View Website"
                },              
              ]
            },
          ]
        }
      }
    }
  };
  responses(request_body);
};

function callSendAPI(senderID, response) {
    var request_body = {
      "recipient": {
        "id": senderID
      },
      "message": {
          "text": response,
          "quick_replies":[
            {
              "content_type":"text",
              "title":"Esportes",
              "payload":"ESPORTES",
            },{
              "content_type":"text",
              "title":"Política",
              "payload":"POLÍTICA",
            },{
              "content_type":"text",
              "title":"Entretenimento",
              "payload":"ENTRETENIMENTO",
            },{
              "content_type":"text",
              "title":"Famosos",
              "payload":"FAMOSOS",
            }],
      }
    };
    responses(request_body);
};

function responses (request_body) {
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": 'EAAHSzfoYt4IBAOlYmAUoalx3RXzq5Y42gyFRHGefBF50F9ZC3GrKvaZAH4nEk4oHshRcxaXkXF6WJmHsckMqhfDDWp0cpnQaZA7apsgWUP00IMCrlvHYTuujipfgYAmUDcRrAk9mcVrGd7ZBVTXZARDdwHoaj793nlJgPlx5qEAZDZD' },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
};