import * as pg from './utils/pgConnector.js';
// with a given amount of time, get the data and format it
export function generateReport(slackCom) {
    const dateEnum = getDateEnumFromTime(slackCom.text);
    console.log("dateEnum = ", dateEnum)
    const query = `SELECT * FROM lumberjack.messages WHERE user_id LIKE '${slackCom.userId}%'`;
    console.log(query);
    return pg.executeQuery(query)
        .then((dbResult) => formatRows(dateEnum, dbResult.rows))
}

// Returns a psql date range for the given enum time value
// returns one of (today, yesterday, this_week, last_week, this_month, last_month)
function getDateEnumFromTime(time) {
    let dateEnum = "today";
    if(time.startsWith("yesterday")) {
        dateEnum = "yesterday";
    }

    // /timber report month
    if(time === "month") {
        return "this_month";
    }

    // generate this_month type enum
    // /timber report this month
    if(time.includes("this") || time.includes("current")) {
        dateEnum = "this_";
    }
    if(time.includes("last") || time.includes("previous") || time.includes("prior") || time.includes("former")) {
        dateEnum = "last_";
    }
    if(time.includes("week")) {
        dateEnum += "week";
    }
    if(time.includes("month")) {
        dateEnum += "month";
    }
    return dateEnum;
}

function formatRows(dateEnum, rows) {
    // separate into groups by project
    // generate markdown
    let md = `Report for ${dateEnum}\n\n`
    const projectGroups = {};
    rows.forEach(row => {
        const projName = row.project.trim()
        if(projectGroups[projName] === undefined) {
            projectGroups[projName] = [];
        }
        projectGroups[projName].push({
            text: row.message.trim(),
            date: new Date(row.date),
            time: row.time_worked || null,
        });
    });
    Object.keys(projectGroups).forEach((key) => {
        md += `*${key}*\n\n`;
        projectGroups[key].forEach(task => {
            md += `• ${task.text}${!!task.time ? " - " + task.time : ""}\n`
        })

    })
    return md;
}