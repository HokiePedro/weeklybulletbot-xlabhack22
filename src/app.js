import express from 'express';
import bodyParser from 'body-parser';
import SlackCommand from './models/SlackCommand.js';
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.all('*', function (req, res, next) {
    console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
    console.log("Body:"+ JSON.stringify(req.body));
    next();
})
app.post('/', function (req, res) {
    const slackCom = new SlackCommand(req.body);
    console.log(slackCom.toPrettyString())
    switch (slackCom.subCommand) {
        case "report":
            res.json({ body: "show report modal" });
            break;
        case "help":
            res.json({ body: "show help message" });
            break;
        case "task":
            res.json({ body: "show task modal" });
            break;
        default:
            break;
    }
})


app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})