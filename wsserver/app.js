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


//elenco dei require per i route che gestiscono le diverse risorse del webservice
const rUsers = require('./router');
const { route } = require('./users');
//const rInit = 
// Creo l'applicazione express
const app = express();

// Aggiungo moduli middleware alla catena di elaborazione
app.use("./init");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Aggiungiamo la librearia CORS : Aggiugne nel intestazioen della Response una righa che 
//consente ad applicazioni ospitate su altri domini di acedere al web service 
app.use(cors());

//Pubbliclo il suito web nelòla cartella chiamta public
app.use('',express.static('Public'));

app.use('/users',  rUsers);
// ... implemento metodi CRUD 

// metto in ascolto la mia applicazione express sulla porta scielta per il WebService 4444
const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta '+ config.port +'....')
})