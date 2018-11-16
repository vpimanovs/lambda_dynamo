console.log('Loading event!');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

const request = require("request");
var tableName = "google-sheet-json";
var datetime = new Date().getTime().toString();

exports.handler = function(event, context, callback) {
  const url = "https://spreadsheets.google.com/feeds/list/15K0E18pzaOBTfF-hbo5cV8gedOgil1m3uOXlHCD_CCg/od6/public/values?alt=json";

  request({
    json: true,
    url: url
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) return

    let parsed = body.feed.entry.map( (entry) => {
      let columns = {
        "updated": entry.updated["$t"]
      }

      // Dynamically add all relevant columns from the Sheets to the response
      Object.keys( entry ).forEach( (key) => {
        if ( /gsx\$/.test(key) ) {
          let newKey = key.replace("gsx$", "");
          columns[newKey] = entry[key]["$t"];
        }
      });

      return columns;
    })

    callback(null, parsed);
  });
  
    dynamodb.putItem({
      "TableName": tableName,
      "Item": {
          "updated": {
            "S": event.updated
          },
          "timedate": {
            "N": datetime
        }
    }
  }, function(err, data) {
      if (err) {
        context.fail("Error: Dynamo failed: " + err);
      } else {
          console.log("Dynamo Success!");
      }
  });
  
};
