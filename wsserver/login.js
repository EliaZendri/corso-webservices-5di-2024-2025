const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./config');
const pool = require('./db');
const { use } = require('./users');

const route = express.Router();

route.post('', async (request, response) => {
    //recupèero le credenziali
    let username = request.body.username;
    let password = request.body.password;
    //controllo se nella tabella e presente un utente con questo username 
    const SQLstring = 'SELECT username, password, ruolo FROM unser WHERE username = ?;';

    try {
        const [dati] = await pool.execute(SQLstring, username);
        if (!dati) {
            return response.status(401).json({
                messaggio: 'Username o password errati'
            })
        }
        //l utente esiste 
        let utente = dati[0];
        if (!bcrypt.compareSync(password, utente.password)) {
            return response.status(401).json({
                messaggio: 'Password non valida'
            })

        }
        const tokenData = {
            username: username,
            ruolo: utente.ruolo,
            tipo: 'dati'
        }
        //creo il tokenbirer
        const tokenPerDati = jwt.sign(tokenData, config.secretKey, { expiresIn: config.durataTokeBearer });

        const tokenRefresh = {
            username: username,
            ruolo: utente.ruolo,
            tipo: 'refresh'
        }

        const tokenPerRefresh = jwt.sign(tokenRefresh, config.secretKey, { expiresIn: config.durataTokeRefresh });

        return response.status(200).json()({
            dati: {
            tipo: 'Bearer',
            durata: config.durataTokeBearer,
            token: tokenPerDati
            },
            refresh: {
                tipo: 'Bearer',
                durata: config.durataTokeBearer,
                token: tokenPerRefresh
            }
        })
    }
    catch (errore) {
        response.status(500).json({
            errore: 'errore interno del server',
            descrizzione: error
        })
    }
})
module.exports = route;