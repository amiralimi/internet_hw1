let fs = require('fs');

module.exports = {
    read_data: function () {
        let obj = JSON.parse(fs.readFileSync('inputfile.json', 'utf8'));
        console.log('initial data has been read from the file.');
        return obj;
    },
};
