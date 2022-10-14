import express from 'express';
import bodyParser from 'body-parser';
import SlackCommand from './models/SlackCommand.js';
import * as Slack from './utils/slack.js';
import * as Report from './report.js';
import * as Task from './task.js';

var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

/**
 * @todo create user if they don't exist
 *      during user creation, update their home view of the app
 * @todo Create the ability to edit a task?
 * @todo Admin feature to create a team report
 */

app.all('*', function (req, res, next) {
    // console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
    // console.log("Body:"+ JSON.stringify(req.body));
    next();
})
app.post('/', function (req, res) {
    const slackCom = new SlackCommand(req.body);

    console.log(slackCom.toPrettyString())

    switch (slackCom.subCommand) {
        case "report":
            /**
             * @todo open modal with report in textbox rather than a reply message
             */
            Report.generateReport(slackCom)
                .then((md) => {
                    res.json(Slack.getMdBlock(md));
                })
            break;
        case "help":
            handleHelp(res);
            break;
        case "task":
            /**
             * `/timber task` should open a clean modal to create the task
             */
            Task.createTask(slackCom)
                .then((md) => {
                    res.json(Slack.getMdBlock(md));
                })
            break;
        default:
            handleHelp(res);
            break;
    }
})

/**
 * User submits the bot home page form
 */
app.post('/hometab', function (req, res) {
    console.log(req.body.payload);
    console.log(req.body.payload.view.state.values);
    res.json({status: "Success"});
});

function handleHelp(res) {
    res.json(Slack.getMdBlock(`
✅ Create a new task with \`/timber task [project] [task text]\`\n
👀 All tasks grouped by project with \`/timber report [today, this month, last week]\`\n
❓Get this text with \`/timber help\`
    `));
}


app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})