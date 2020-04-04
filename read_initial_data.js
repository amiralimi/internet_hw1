let fs = require('fs');

module.exports = {
    read_data: function () {
        try {
            let obj = JSON.parse(fs.readFileSync('db_file.json', 'utf8'));
            console.log('initial data has been read from the file.');
            return obj;
        } catch (e) {
            fs.copyFileSync('empty_feature_collection.json', 'db_file.json');
            console.log('db file created.');
            return JSON.parse(fs.readFileSync('empty_feature_collection.json', 'utf8'));
        }
    },
};
