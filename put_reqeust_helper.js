const gjv = require('geojson-validation');
const fs = require('fs');

module.exports = {
    validate_input: function (data) {
        return gjv.isFeature(data, function (valid, errs) {
            return valid;
        });
    },
    handle_data: function (data, geo_data) {
        geo_data.features.push(data);
        fs.writeFile('inputfile.json', JSON.stringify(geo_data), (err => {
            if (err) {
                console.log('error in updating the input file.');
                throw err;
            }
            console.log('input file has been updated');
        }));
    },
};