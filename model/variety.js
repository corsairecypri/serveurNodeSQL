const db = require('./pool');
const knex = require('./knexClient');


const findAll = async () => {
    return await knex('variety').join('species','variety.species_id', '=', 'species.id').select('variety.cultivar', 'species.scientific_name', 'species.common_name', 'species.family');
    
}

const findOne = async (id) => {
    return await knex('variety').select().where({ id }).first();
}

const insert = async (payload) => {
    await knex('variety').insert(payload);
}

const del = async (id) => {
    await knex('variety').del().where({ id });
}

const update = async (id, payload) => {
    await knex('variety').update(payload).where({ id });
}

//Les fonctions de jutosité et de l'amertume


const findByMinJuiciness = async (minJu) => {
    //avec le where de Knex, les attributs et les opérateurs doivent être
    //mis entre parenthèses, mais pas les variables.
    return await knex('variety').select().where( 'juiciness', '>=', minJu );
}

const findByMaxJuiciness = async (maxJu) => {
    return await knex('variety').select().where( 'juiciness', '<=', maxJu );
}

const findByMinBitterness = async (minBi) => {
    return await knex('variety').select().where( 'bitterness', '>=', minBi );
}

const findByMaxBitterness = async (maxBi) => {
    return await knex('variety').select().where( 'bitterness', '<=', maxBi );
}


//Une fonction trouvée dans la correction du jour 3

const findBetween = async (criteria) => {
    let request = knex('variety_with_full_name').select();
  
    // je récupère les 2 éventuelles propriétés
    const { juiciness, bitterness } = criteria;
  
    // puis je teste leur existence
    if (juiciness) {
      // même principe ici
      const { min, max } = juiciness
      if (min) {
        request = request.where('juiciness', '>=', min);
      }
      if (max) {
        request = request.where('juiciness', '<=', max);
      }
    }
    if (bitterness) {
      // même principe ici
      const { min, max } = bitterness
      if (min) {
        request = request.where('bitterness', '>=', min);
      }
      if (max) {
        request = request.where('bitterness', '<=', max);
      }
    }
  
    // la requête est composée sur mesure, il ne reste qu'à l'exécuter
    return await request;
}


module.exports = {
    findAll,
    findOne, 
    insert,
    del, 
    update,
    findByMinJuiciness,
    findByMaxJuiciness,
    findByMinBitterness,
    findByMaxBitterness,
    findBetween
}