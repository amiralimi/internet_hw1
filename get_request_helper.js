let inside = require('point-in-polygon');

module.exports = {
    get_result: function (geo_data, point) {
        let result = [];
        for (let polygon of geo_data.features) {
            let coordinates = polygon.geometry.coordinates[0];
            if (inside(point, coordinates)){
                result.push(polygon.properties.name);
            }
        }
        result = {'polygons': result};
        return JSON.stringify(result);
    },
    check_values: function (point) {
        for (let number of point){
            if (isNaN(number)){
                return false;
            }
        }
        return true;
    },
};