import * as pg from './utils/pgConnector.js';

export function createTask(slackCom) {
    // insert new task into db
    // return success/fail
    const userId = slackCom.userId;
    const project = slackCom.project;
    const message = slackCom.text;
    return pg.executeQuery(`Insert into lumberjack.messages(user_id, project, message, date)` +
    `values('${userId}','${project}','${message}', now())`)
        .then((dbResult) => createResponseMd(dbResult, slackCom))
}

function createResponseMd(dbResult, slackCom) {
    if(dbResult.rowCount > 0) {
        return `You worked on *${slackCom.project}* and the task is called \`${slackCom.text}\``;
    } else {
        return "Update failed for some reason."
    }
}