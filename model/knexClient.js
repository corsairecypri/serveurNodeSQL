const knex = require('knex')({
    client : 'pg', //Attention ici pg est l'abbréviation
    //de Postgres et non le nom du module pg
    connection : {
        host : process.env.PGHOST,
        port : process.env.PGPORT,
        user : process.env.PGUSER,
        password : process.env.PGPASSWORD,
        database : process.env.PGDATABASE,
    }
});

module.exports = knex;