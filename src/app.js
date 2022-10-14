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
            Report.generateReport()
            res.json({ body: "show report modal" });
            break;
        case "help":
            handleHelp(res);
            break;
        case "task":
            res.json({ body: "show task modal" });
            break;
        default:
            handleHelp(res);
            break;
    }
})

function handleHelp(res) {
    res.json(Slack.getMdBlock(`
        👀 View all tasks with \`/timber report\`\n❓Get help at any time with \`/timber help\` or type *help* in a DM with me
    `));
}


app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})