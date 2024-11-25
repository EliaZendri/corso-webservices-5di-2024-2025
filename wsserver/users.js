//gestire tutte le operazioni CRUD sulla tabella users
const express = require('express');
const mysql = require('mysql2/promise');        
const bcrypt = require('bcrypt');
const config = require('./config');
const pool = require('./db');
const router = express.Router();
//questo router gestira tutt ele richieste dai cliente che anno come url l indirizzo di base: http://locahost:4444/users

 router.get('', async (request, response) => {
         try {
            const SQLstring ='SELECT * FROM users;';
            const [dati] = pool.execute(SQLstring);
            return response.status(200).send(dati);
         }
         catch (error) {
            return response.status(500).json({
                messaggio: 'errore interno del server MYSQL.',
            error:error 
            })
         }
         
    })
    module.exports = router;