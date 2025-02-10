// Creo una costante che prende come valore il package express
const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const cors = require('cors');

// Import gli oggetti/funzioni dichiarate in altri file
// Per i nostri oggetti, funzioni, costanti, ecc. è necessario
// speficicare il percorso per raggiungere il file
const config = require('./config');

const dbpassword = fs.readFileSync('/run/secrets/root_db_password');
config.initDB.password = dbpassword;
const initkey = fs.readFileSync('/run/secret/init_key');
const secretKey = fs.readFileSync('/run/');

const parseJSON = require('./json-check');

//libreria che ci consente di interagie con il file siste
const fs = require('fs');

// Elenco dei require per i router che gestiscono le diverse risorse del mio webservice
const rUsers = require('./users');
const rInit = require('./init');
const rLogin = require('./login');
const rRefresh = require('./refresh');

// Creo l'applicazione express
const app = express();

// Aggiungo moduli middleware alla catena di elaborazione
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Aggiungo la libreria CORS: Aggiunge nell'intestazione della response
// Una riga che consente ad applicazioni ospitate su altri domini di accedere al webservice
app.use(cors());

// Controllo che i dati ricevuti dal server siano scritti in formato JSON corretto
app.use(parseJSON);

// Pubblico il sito web di help contenuto nella cartella chiamata public
app.use('', express.static('public'));

// ... implemento metodi CRUD
app.use('/init', rInit);
app.use('/users', rUsers);
app.use('/login', rLogin);
app.use('/refresh', rRefresh);

// Metto in ascolto la mia applicazione express sulla porta scelta per il webservice: 4444

const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta ' + config.port + '...');
})