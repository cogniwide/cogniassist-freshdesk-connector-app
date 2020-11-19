
/**  
 * @description - Everytime a new ticket is created/updated, this app makes an API 
 * request to CogniAssist and prints the response to the terminal window.
 */
var request = require('request');
var utils = require('./lib/utils');
var base64 = require('base-64');

exports = {

  events: [
    { event: 'onTicketCreate', callback: 'onTicketCreateHandler' },
    { event: "onConversationCreate", callback: "onConversationCreateCallback" }
  ],

  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.

  onTicketCreateHandler: function (args) {

    var responder_id = args['data']['ticket']["responder_id"]

    // dont call webhook if ticket has already an assignee other than bot user
    if (responder_id != null && responder_id != args['iparams']["botUserID"])
      return;

    var payload = {
      "body_text": args['data']['ticket']['description_text'],
      "body_html": args['data']['ticket']['description'],
      "ticket_id": args['data']['ticket']['id'],
      "ticket_subject": args['data']['ticket']['subject'],
      "event": "ticket_created",
      "meta": {
        "attachments": args['data']['ticket']['attachments']
      }
    }
    var headers = { "Authorization": "Bearer " + args['iparams']["cogniassistAPIKey"] };
    var options = { method: "POST", headers: headers, json: true, body: payload };
    var url = args['iparams']["cogniassistInstanceURL"] + "webhooks/freshdesk/webhook";

    // call CogniAssist webhook with ticket data
    request(url, options, (error, response) => {
      utils.handleResponse(error, response);
    });
  },

  onConversationCreateCallback: function (args) {

    // dont call webhook if reply is created by agent
    if (!args['data']['conversation']['incoming'])
      return;

    var freshdeskAPIURL = "https://"+args['iparams']["freshdeskDomain"]+".freshdesk.com/api/v2/tickets/" + args['data']['conversation']['ticket_id']
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: "Basic " +  base64.encode(args['iparams']["freshdeskAPIKey"])
      },
      json:true
    }

    request(freshdeskAPIURL,requestOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log(body)
          // ignore if reply is not to a ticket handled by BOT user
          if(body["responder_id"] != args['iparams']["botUserID"]){
            return;
          }

          var payload = {
            "body_text": args['data']['conversation']['body_text'],
            "body_html": args['data']['conversation']['body'],
            "ticket_id": args['data']['conversation']['ticket_id'],
            "event": "reply_created",
            "meta": {
              "attachments": args['data']['conversation']['attachments']
            }
          }

          var headers = { "Authorization": "Bearer " + args['iparams']["cogniassistAPIKey"] };
          var options = { method: "POST", headers: headers, json: true, body: payload };
          var url = args['iparams']["cogniassistInstanceURL"] + "webhooks/freshdesk/webhook";

          // call CogniAssist webhook with ticket data
          request(url, options, (error, response) => {
            utils.handleResponse(error, response);
          });

        }else{
          console.log(error)
        }
      }
    )
  }

};