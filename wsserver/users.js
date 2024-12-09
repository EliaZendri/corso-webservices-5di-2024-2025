//gestire tutte le operazioni CRUD sulla tabella users
const express = require('express');
const mysql = require('mysql2/promise');        
const bcrypt = require('bcrypt');
const {body , validationResult } = require ('express-validation')
const config = require('./config');
const pool = require('./db');
const router = express.Router();
//const { aministratorAurth}
const { getFields } = require('./utils');
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

    router.post('' , [
      body('username').notEmpty().whithMessage('Username deve essere not null'),
      body('password').notEmpty().whithMessage('Password deve essere not null'),
      body('ruolo').notEmpty().whithMessage('Ruolo deve essere not null'),
    ], async (request, response) => {
         const errori = validationResult(request); 
         if(!errori.isEmpty()) {
            return response.status(400).json({
               errori: errori.array()
            })
         }
         CorrectRequestData(request.body, 'users');
         
         return request.status(200).send('ok');
    })
    module.exports = router;