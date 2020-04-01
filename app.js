const express = require('express');
const read_initial_data = require('./read_initial_data');
const get_request_helper = require('./get_request_helper');
const put_request_helper = require('./put_reqeust_helper');

const app = express();
app.use(express.json());

let geo_data = read_initial_data.read_data();
console.log('initial data has been loaded to memory.');

app.get('/gis/testpoint', function (request, response) {
    let point = [parseFloat(request.query.lat), parseFloat(request.query.long)];
    if (get_request_helper.check_values(point)) {
        let result = get_request_helper.get_result(geo_data, point);
        if (result.polygons.length === 0) {
            console.log(`input ${point} was not found in any polygons.`);
        } else {
            console.log(`input ${point} was found in ${result}.`);
        }
        response.send(JSON.stringify(result));
    } else {
        console.log(`input values ${point} are not correct`);
        response.status(400);
        response.send('input values are not correct');
    }
});

app.put('/gis/addpolygon', function (request, response) {
    let input_data = request.body;
    if (put_request_helper.validate_input(input_data)) {
        put_request_helper.handle_data(input_data, geo_data);
        console.log('new data is in memory and saved on the new file.');
        response.send(JSON.stringify(geo_data));
    } else {
        response.status(400);
        response.send('invalid geojson input.');
    }
});

app.listen(3000);