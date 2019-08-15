const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const request = require('request');

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log('Listening on port 3000');
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));


// ENDPOINTS

app.get('/', (req, res) => {
    res.send('Running');
});

app.get('/webhook', (req, res) => {
    if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'chatbotteste') {
        res.status(200).send(req.query['hub.challenge']);
    }else {
        res.sendStatus(403);
    };
});

app.post('/webhook', (req, res) => {
    let data = req.body;
    if (data && data.object === 'page') { 
        data.entry.forEach((entry) => {
            var pageID = entry.id;
            var timeOfEvent = entry.time;

            entry.messaging.forEach((event) => {
                if (event.message) {
                    treatMessage(event);
                }
            });
        });
    }
    res.sendStatus(200);
});


function treatMessage (event) {
    let senderID = event.sender.id;
    let recipientID = event.recipient.id;
    let timeOfMessage = event.timestamp;
    let message = event.message;


    let messageText = message.text;
    let messageID = message.mid;
    let attachments = message.attachments;

    if(messageText) {
        console.log('Chegou aqui')
        switch(messageText.toUpperCase()){
            case 'OI':
                console.log('Chegou no oi')
                callSendAPI(senderID, "Olá, que temas de notícias você deseja?");
                break;
            case 'ESPORTES':
                
            
                break;
            case 'POLÍTICA':
                
            
                break;
            case 'ENTRETENIMENTO':
                
            
                break;
            case 'FAMOSOS':
                
            
                break;

            default:
                    callSendAPI(senderID, "Desculpa, mas eu não entendi o que voce disse!!");
                break
        }
    }

}


function callSendAPI(sender_psid, response) {
    let request_body = {
      "recipient": {
        "id": sender_psid
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
            }]
      }
    };
  
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

}