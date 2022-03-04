const db = require('./pool');
const knex = require('./knexClient');


const findAll = async () => {
    return await knex('species').select();
}


const findOne = async (id) => {
    return await knex('species').select().where({ id }).first();
}


const insert = async (payload) => {
    //Note du jour 3 : on souhaite renvoyer l'id du payload
    //qu'on met dans un tableau
    //(Pour qu'elle renvoie un résultat, il faut mettre un return)
    return await knex('species').insert(payload, ['id']);
}


const del = async (id) => {
    await knex('species').del().where({ id });
}

const update = async (id, payload) => {
    await knex('species').update(payload).where({ id });
}

//Chercher des recherches par familles ou espèces

const findByFamily = async (family) => {
    return await knex('species').join('variety','variety.species_id', '=', 'species.id').select('variety.cultivar', 'species.family').where('species.family', '=', family);
}


const findBySpecies = async (speciesName) => {
    return await knex('species').join('variety','variety.species_id', '=', 'species.id').select('variety.cultivar', 'species.scientific_name').where('species.scientific_name', "=", speciesName);
}

//Les mêmes mais avec de la recherche progressive (suggestions de recherches)


const findBySpeciesProg = async (speciesName) => {
    //Pour la fonction whereLike, on écrit d'abord le nom de la variable, puis le regex
    //(Ne pas oublier le L majuscule)
    return await knex('species').join('variety','variety.species_id', '=', 'species.id').select('variety.cultivar', 'species.scientific_name').whereLike('species.scientific_name', `${speciesName}%` );
}


const findByFamilyProg = async (family) => {
    
    //Avec la table species, l'énum family complique tout et
    //oblige à utiliser whereRaw (dans lequel on écrit comme en SQL)
    //et en convertit family en texte

    //Les backticks c'est pour écrire du SQL et les guillemets simples
    //servent à dire que la variable est du texte
    return await knex('species').join('variety','variety.species_id', '=', 'species.id').select('variety.cultivar', 'species.family').whereRaw(`family::text LIKE '${family}%' `);
}


module.exports = {
    findAll,
    findOne,
    insert,
    del,
    update,
    findByFamily,
    findBySpecies, 
    findByFamilyProg,
    findBySpeciesProg
}