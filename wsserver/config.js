const config = {
    port: 4444 ,
    initSecret: '12334234',
    initDB: {
        host: 'dbserver',
        user: 'root',
        password: 'cisco',

    },
    saltOrRounds: 10
}
//sporto la costatante config in mdo che possa esssere utilizat in altri file javascript
module.exports = config;