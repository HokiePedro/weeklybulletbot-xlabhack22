import * as pg from './utils/pgConnector.js';
// with a given amount of time, get the data and format it
export function generateReport(time) {
    const dateEnum = getDateEnumFromTime(time);
    console.log("dateEnum = ", dateEnum)
    return pg.executeQuery('SELECT * FROM lumberjack.messages')
        .then((dbResult) => formatRows(dbResult.rows))
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

function formatRows(rows) {
    // separate into groups by project
    // generate markdown
    let md = ""
    console.log(rows);
    return md;
}