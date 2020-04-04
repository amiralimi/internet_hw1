const express = require('express');
const read_initial_data = require('./read_initial_data');
const get_request_helper = require('./get_request_helper');
const put_request_helper = require('./put_reqeust_helper');
const morgan = require('morgan');
let winston = require('./config/winston');

const app = express();
app.use(morgan('combined', {stream: winston.stream}));
app.use(express.json());
const port = process.env.PORT || 3000;

let geo_data = read_initial_data.read_data();
console.log('initial data has been loaded to memory.');

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/gis/testpoint', function (request, response) {
    let point = [parseFloat(request.query.lat), parseFloat(request.query.long)];
    if (get_request_helper.check_values(point)) {
        let result = get_request_helper.get_result(geo_data, point);
        if (result.polygons.length === 0) {
            console.log(`input ${point} was not found in any polygons.`);
        } else {
            console.log(`input ${point} was found in ${result}.`);
        }
        response.setHeader('Content-Type', 'application/json');
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
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(geo_data));
    } else {
        response.status(400);
        response.send('invalid geojson input.');
    }
});

app.use(function (req, res, next) {
    res.status(400);
    res.send('bad reqeust');
});

app.listen(port);