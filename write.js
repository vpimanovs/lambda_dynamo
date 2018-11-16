      
var AWS = require("aws-sdk");
let awsConfig = {
    "region": "eu-west-2",
    "endpoint": "http://dynamodb.eu-west-2.amazonaws.com",
    "accessKeyId": "XXX", "secretAccessKey": "XXX"
};
AWS.config.update(awsConfig);

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var data = require('./data.json');
var i = 0;
var params = {
    RequestItems: {
      "google-sheet-new": [
        {
           PutRequest: {
             Item: {
               "updated": { "S": data[i].updated },
                 "journalcode": { "S": data[i].journalcode },
                 "despatchmethod": { "S": data[i].despatchmethod },
                 "curencycode": { "S": data[i].curencycode },
                 "fullstu": { "S": data[i].fullstu },
                 "product": { "S": data[i].product },
                 "terms": { "S": data[i].terms },
                 "recurringpayment": { "S": data[i].recurringpayment },
                 "termcode": { "S": data[i].termcode },
                 "weeks": { "S": data[i].weeks },
                 "rate": { "S": data[i].rate },
                 "renewalrate": { "S": data[i].renewalrate },
                 "pricepermonth": { "S": data[i].pricepermonth },
                 "savingrounded": { "S": data[i].savingrounded },
                 "savingcalc": { "S": data[i].savingcalc },
                 "priceweek": { "S": data[i].priceweek },
                 "calcsavingsprint": {  "S": data[i].calcsavingsprint },
                 "calcsavingsdigital": { "S": data[i].calcsavingsdigital },
                 "calcsavingsprintdigital": { "S": data[i].calcsavingsprintdigital },
                 "print": { "S": data[i].print },
                 "digital": { "S": data[i].digital }
             }
           }
         }
      ]
    }
  };

    function send() {
    for (i=0; i<15; i++){
    ddb.batchWriteItem(params, function(err, data) {
        if (err) {
            console.log("google-sheet-new::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("google-sheet-new::save::success" );
            console.log(i);              
        }
                });
            }
                    }
    send();