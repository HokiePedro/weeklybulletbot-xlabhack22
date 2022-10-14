const SUB_COMMANDS = ['help', 'task', 'report'];
export default class SlackCommand {
    userId = "";
    userName = "";
    command = "";
    text = "";
    subCommand = "";
    project = "";
    constructor(req) {
        this.userId = req.user_id.toLowerCase();
        this.userName = req.user_name;
        this.command = req.command;
        this.text = req.text;
        this.getSubCommands();
        if(this.subCommand === "task") {
            this.project = this.text.split(" ")[0];
            this.text = this.text.substring(this.project.length + 1, this.text.length);
        }
        console.log(this.text);
    }

    getSubCommands() {
        // if text starts with one of the SUB_COMMANDS, extract it as this.subCommand
        if(this.text.startsWith(SUB_COMMANDS[0])) {
            this.subCommand = SUB_COMMANDS[0];
            this.text = this.text.replace(`${SUB_COMMANDS[0]} `, "");
        }
        if(this.text.startsWith(SUB_COMMANDS[1])) {
            this.subCommand = SUB_COMMANDS[1];
            this.text = this.text.replace(`${SUB_COMMANDS[1]} `, "");
        }
        if(this.text.startsWith(SUB_COMMANDS[2])) {
            this.subCommand = SUB_COMMANDS[2];
            this.text = this.text.replace(`${SUB_COMMANDS[2]} `, "");
        }
    }

    toPrettyString() {
        console.log(`The user ${this.userName} (${this.userId}) ran the command "${this.command}" with the text "${this.text}"`);
    }
}