function getData(){
    return new Promise((resolved , rejected) =>{
        //metodo per simulare lo stato resolved o rejected dlla ostra PROMISE
        let success = Math.random() > 0.3;
        //simuliamo un servizzio che impiega tempo per essere eseguito 
        setTimeout(() => {
                if(succese){
                    //la promise viene risolta con successo 
                    const data = {
                        id: 1,
                        nome: 'chiara'
                    }
                    resolved(data)
                }
                else{
                    rejected('Errore interno del Server.')
                }
        },2000)
    })
}

function dataAsyncronus(){
    getData().then((data => {
        console.log('Ricevuti i dati in mdo asincrono: ', data);
    }))
    .catch(errore => {
        console.log('Errore nella ricezione dei dati asincroni: ', errore);
    })
    .finally(() => {
        console.log('Finaly eseguit in entrambi i casi...');
    })
    
}

async function dataSyncronus(){
        try{
            console.log('inizio a ricevere i dati: ');
            const data = await getData();
            console.log('Dati ricevuti in modo Sicuro: ' , data);
        }
        catch (errore) {
            console.log('Errore nella Ricezione dei dati sincroni..', errore);
        }
}

console.log('Inizio operazioni asincrone.....');
dataAsyncronus();
console.log('Fine operazioni asincrone.');

console.log('Inizio operazioni sincrone.....');
dataSyncronus();
console.log('Fine operazioni sincrone.');