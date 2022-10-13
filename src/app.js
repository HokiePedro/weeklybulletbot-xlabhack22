const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode:true,
    appToken: process.env.APP_TOKEN,
    port: process.env.PORT
});

app.command('/timber', async ({ command, ack, say }) => {
    try {
      await ack();
      say("Yaaay! that command works!" + command.text);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});


(async () => {
    // Start your app
    await app.start();
    console.log('⚡️ Bolt app is running!');
})();