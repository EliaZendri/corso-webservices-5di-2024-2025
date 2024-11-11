// Creo una costante che prende come valore il package express
const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

//importo gli oggeti/funzioni dichiarati in altri file 
const config = require('./config');
const { send } = require('process');

// Creo l'applicazione express
const app = express();

// Aggiungo moduli middleware alla catena di elaborazione
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Aggiungiamo la librearia CORS : Aggiugne nel intestazioen della Response una righa che 
//consente ad applicazioni ospitate su altri domini di acedere al web service 
app.use(cors());

//Pubbliclo il suito web nelòla cartella chiamta public
app.use('',express.static('Public'));


//implemetno il metodo per l'inazializazione del DB
app.post('./init',async (require,response) =>{
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
    const insertSQL = "INSERT IN TO USER (username, password) VALUES ('admin', ?)";
    results = connesione.query(insertSQL, passwordCryptata);
    const logSQL =" INSERT INTO logs (event, eventtime) VALUES ('inizializazzioen database', now())";
    results = connesione.query(logSQL);

    response.status(200).send('dfrjkhj');
}
catch (errore) {
        response.status(500).send(errore);  
}
finally{
    await   connesione.end();
}
}
else{
    response.status(403).send('Secret non presente o errata');
    //..toExponential. queste istruzioni non verrano mai eseguite
}
})
// ... implemento metodi CRUD 

// metto in ascolto la mia applicazione express sulla porta scielta per il WebService 4444
const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta '+ config.port +'....')
})