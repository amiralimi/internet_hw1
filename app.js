const express = require('express');
const read_initial_data = require('./read_initial_data');

const app = express();

let geo_data = read_initial_data.read_data();
console.log('initial data has been loaded to memory.');
