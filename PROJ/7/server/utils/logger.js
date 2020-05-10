let fs = require('fs');
let writer = require('./writer.js');

let file = './server/db/logs.json';

module.exports = function (action, item) {
    try {
        fs.readFile(file, 'utf-8', async (err, data) => {
            if(!err) {
                let logs = JSON.parse(data);
                logs.push({
                    time: new Date(),
                    action, item
                })

                await writer(file, JSON.stringify(logs, null, ' '));
                return true
            } else {
                console.log('cant find logs');
            }
        })
    }
    catch {
        console.log('unexpected error log writer');
        return false
    }
};