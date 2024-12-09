const config = {
    port: 4444 ,
    initSecret: '12334234',
    initDB: {
        host: 'dbserver',
        user: 'root',
        password: 'cisco',
        port: 3306,
        

    },
    secretKey: 'pippoplutoepapaerino',
    durataTokeBearer: 3600,
    saltOrRounds: 10,
    tabelle: {
        users: ['id', 'nome', 'cognome','ndirizzo','cap','citta','provincia','telefon','cell','mail','username','password','ruolo',]
    }
}
//sporto la costatante config in mdo che possa esssere utilizat in altri file javascript
module.exports = config;