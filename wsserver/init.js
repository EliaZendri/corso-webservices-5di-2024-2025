const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs = require('fs');

//importo gli oggeti/funzioni dichiarati in altri file 
const config = require('./config');

const router = express.Router();ù

router.post('./init',async (require,response) =>{
    //funzione di callBack mandata in esecuzione quadno un client invia una richiesta per L'URL
    let secret = request.body.secret;
    let adminpassword = require.body.adminpwd
    
    if(secret == config.initSecret){
        try{
        //carico lo script SQL dall filr system
        const scriptSQL = fs.readFileSync('./script/init.sql', 'utf8');
        const connesione = await mysql.createConnection(config.initDB);
        let results = await connesione.query(scriptSQL);
        let passwordCryptata = bcrypt.hashSync(adminpassword, config.saltOrRounds);
        const insertSQL = "INSERT IN TO user (username, password) VALUES ('admin', ?, 'administrator')";
        results = await connesione.query(insertSQL, passwordCryptata);
        const logSQL =" INSERT INTO logs (event, eventtime) VALUES ('inizializazzioen database', now())";
        results = await connesione.query(logSQL);
    
       return response.status(200).send('db inizializato');
    }   
    catch (errore) {
            response.status(500).send(errore); 
    }
    finally{
        await connesione.end();
        return response.status(500).send(errore); 
    }
    }
    else{
        response.status(403).send('Secret non presente o errata');
        //..toExponential. queste istruzioni non verrano mai eseguite
    }
    })

    module.exports = router;