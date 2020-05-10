let fs = require('fs');

module.exports = async function(file, data) {
    try {
        await fs.writeFile(file, data, err => { 
            if (err) {
                console.log(err, 'here')
            } 
        });
        return true;
    }
    catch {
        return false;
    }
};