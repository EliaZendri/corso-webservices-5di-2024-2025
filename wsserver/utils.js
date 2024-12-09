const config = require('./config');

function CorrectRequestData(body, table) {
    // const fields = Object.keys(body);
    // console.log(fields);
    // const correnti = fields.filter(field => config.tabelle[table].includes(field));
    // console.log(correnti);
    // const oggettoCorretto = correnti.reduce((oggettoDaRicostruire, field) => {
    //     oggettoDaRicostruire[field] = body[field]
    //     return oggettoDaRicostruire
    // }, {});
    // console.log(oggettoCorretto);
    // return;
    return Object.keys(body)
            .filter(field => config.tabelle[table].include(field))
            .reduce((newObject, field) => {
                newObject[field] = body[field];
                return newObject;       
            }, {})
}


function getColums(dati) {
    return Object.keys(dati);
}

function getValues(dati) {
    return Object.keys()
}

module.exports = { getFields }