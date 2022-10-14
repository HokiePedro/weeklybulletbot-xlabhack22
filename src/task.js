import * as pg from './utils/pgConnector.js';

/**
 * Insert task into database
 * @param {SlackCommand} slackCom - original slack command object
 * @return promise of db query which returns formatted markdown
 */
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

/**
 * Create some markdown based on the dbResult
 * @param {Object} dbResult - Result object passed back from psql
 * @param {SlackCommand} slackCom - original slack command object
 * @return markdown based on dbResult
 */
function createResponseMd(dbResult, slackCom) {
    /**
     * @todo log new tasks to messages section of bot, not as a response
     */
    if(dbResult.rowCount > 0) {
        return `You worked on *${slackCom.project}* and the task is called \`${slackCom.text}\``;
    } else {
        return "Update failed for some reason."
    }
}