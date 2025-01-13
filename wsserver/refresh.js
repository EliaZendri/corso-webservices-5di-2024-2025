const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('./config');
const pool = require('./db');
const { use } = require('./users');

const route = express.Router();

route.get('', async (request, response) =>{
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return response.status(401).json({
            messaggio: 'Accesso non autorizzato.'
        })
    }
    jwt.verify(token, config.secretKey, async (err, refreshToke) => {
        if (err) {
            // Il token non era valido
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }
        // Il token è valido

        if(datiToken.tipo != 'dati' ){
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }

        const stringSQL = "SELECT id FROM users WHERE username = ? AND ruolo = 'administrator';";

        const [dati] = await pool.execute(stringSQL, [refreshToke.username,refreshToke.ruolo]);

        if(dati.length == 0) {
            return response.status(401).json({
                messaggio: 'Accesso non autorizzato.'
            })
        }
        else {
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
    })
});

module.exports = router;