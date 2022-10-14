import * as pg from './utils/pgConnector.js';
// with a given amount of time, get the data and format it
export function generateReport(time) {
    pg.executeQuery('SELECT now()')
        .then(result => console.log(result))
}