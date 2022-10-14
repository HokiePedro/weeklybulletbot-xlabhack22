import express from 'express';
import bodyParser from 'body-parser';
import SlackCommand from './models/SlackCommand.js';
import * as Slack from './utils/slack.js';
import * as Report from './report.js';
import * as Task from './task.js';
import request from 'request';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.all('*', function (req, res, next) {
    next();
})
app.post('/', function (req, res) {
    const slackCom = new SlackCommand(req.body);

    let triggerId = req.body.trigger_id;
    console.log(req.body);
    switch (slackCom.subCommand) {
        case "report":
            let channelId = req.body.channel_id;
            let userId = req.body.user_id;
            let messageOptions = updateMessage(slackCom.text);
            console.log(slackCom);

            let taskOptions = {
                headers: {
                    "Content-Type" : "application/json"
                },
                uri: "https://hooks.slack.com/services/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",
                method: "POST",
                json: messageOptions
            };

            request(taskOptions, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body.id) // Print the shortened url.
                }
            });
            break;
        case "help":
            handleHelp(res);
            break;
        case "task":
            let modalOptions = updateModal(triggerId);
            let taskItems = slackCom.text;

            if(taskItems.length > 0){
                let taskList = taskItems.split(',');
                console.log(taskList);
                let jsonBlob = updateMessage(taskList);

                let taskOptions = {
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    uri: "https://hooks.slack.com/services/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",
                    method: "POST",
                    json: jsonBlob
                };

                request(taskOptions, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body.id) // Print the shortened url.
                    }
                });
            } else{
                request(modalOptions, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body.id) // Print the shortened url.
                    }
                });
            }
            break;
        default:
            handleHelp(res);
            break;
    }
})

function updateMessage(taskMessages){
    let textItems = [];
    let jsonBlock = {};

    let messageOptions = {
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Date of Submitted Tasks",
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "plain_text",
                        "text": "Friday, October 14, 2022",
                        "emoji": true
                    }
                ]
            },
            {
                "type": "divider"
            }
        ]
    }

    taskMessages.forEach((item, x) => {
        messageOptions.blocks.push({
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": item,
                "emoji": true
            }
        });
    });
    return messageOptions;
}

function handleHelp(res) {
    res.json(Slack.getMdBlock(`
        👀 View all tasks with \`/timber report\`\n❓Get help at any time with \`/timber help\` or type *help* in a DM with me
    `));
}


app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})

function updateModal(triggerId){
    let modal = {
        headers: {
            "Authorization": "Bearer " + process.env.SLACK_BOT_TOKEN,
            "Content-Type" : "application/json"
        },
        uri: "https://slack.com/api/views.open",
        method: "POST",
        json: {
            "trigger_id": triggerId,
            "view": {
                "type": "modal",
                "title": {
                    "type": "plain_text",
                    "text": "Task Logger",
                    "emoji": true
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Submit",
                    "emoji": true
                },
                "close": {
                    "type": "plain_text",
                    "text": "Cancel",
                    "emoji": true
                },
                "blocks": [
                    {
                        "type": "input",
                        "block_id": "5ZX",
                        "label": {
                            "type": "plain_text",
                            "text": "Date of Tasks",
                            "emoji": true
                        },
                        "optional": false,
                        "dispatch_action": false,
                        "element": {
                            "type": "datepicker",
                            "action_id": "datepicker-action",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a date",
                                "emoji": true
                            }
                        }
                    },
                    {
                        "type": "input",
                        "block_id": "XVFy",
                        "label": {
                            "type": "plain_text",
                            "text": "Project Name",
                            "emoji": true
                        },
                        "optional": false,
                        "dispatch_action": false,
                        "element": {
                            "type": "static_select",
                            "action_id": "static_select-action",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select an item",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "DIRT",
                                        "emoji": true
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "UMS",
                                        "emoji": true
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "IPA",
                                        "emoji": true
                                    },
                                    "value": "value-2"
                                }
                            ]
                        }
                    },
                    {
                        "type": "input",
                        "block_id": "2v8=K",
                        "label": {
                            "type": "plain_text",
                            "text": "List Your Tasks & Hours (ex: Task - 1.5)",
                            "emoji": true
                        },
                        "optional": false,
                        "dispatch_action": false,
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "plain_text_input-action",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "ex: Updated objec to include an array of users - 3.0",
                                "emoji": true
                            },
                            "multiline": true,
                            "dispatch_action_config": {
                                "trigger_actions_on": [
                                    "on_enter_pressed"
                                ]
                            }
                        }
                    },
                    {
                        "block_id": "my_block_id",
                        "type": "input",
                        "optional": true,
                        "label": {
                            "type": "plain_text",
                            "text": "Select a channel to post the result on",
                        },
                        "element": {
                            "action_id": "my_action_id",
                            "type": "conversations_select",
                            "response_url_enabled": true,
                        },
                    },
                ]
            }
        }
    };
    return modal;
}

