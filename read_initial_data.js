let fs = require('fs');

module.exports = {
    read_data: function () {
        try {
            let obj = JSON.parse(fs.readFileSync('inputfile.json', 'utf8'));
            console.log('initial data has been read from the file.');
            return obj;
        } catch (e) {
            fs.copyFileSync('empty_feature_collection.json', 'inputfile.json');
            console.log('input file created.');
            return JSON.parse(fs.readFileSync('empty_feature_collection.json', 'utf8'));
        }
    },
};
