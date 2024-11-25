const jwt = require('jsonwebtoken');
const config = require('./config');
const pool = require('./db');

function administratorAuth(request, response, next){
    const autHeader = request.headers['autorization'];
    const token = autHeader && autHeader.split('').[1];
    
}
