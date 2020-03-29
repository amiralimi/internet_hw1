const express = require('express');
const read_initial_data = require('./read_initial_data');
const get_request_helper = require('./get_request_helper');

const app = express();

let geo_data = read_initial_data.read_data();
console.log('initial data has been loaded to memory.');

app.get('/gis/testpoint', function (request, response) {
    let point = [parseFloat(request.query.lat), parseFloat(request.query.long)];
    if (get_request_helper.check_values(point)) {
        let result = get_request_helper.get_result(geo_data, point);
        if (result.length === 0){
            console.log(`input ${point} was not found in any polygons.`);
        } else{
            console.log(`input ${point} was found in ${result}.`);
        }
        response.send(result);
    } else {
        console.log(`input values ${point} are not correct`);
        response.status(400);
        response.send('input values are not correct');
    }
});

app.listen(3000);