require("dotenv").config();

const species = require("./model/species.js");
const variety = require("./model/variety.js");

//Youpi ça marche pour les findAll !!!

//variety.findAll().then(console.table);

//species.findAll().then(console.table);

//Youpi ça marche pour les findOne !!!

//variety.findOne(2).then(console.table);

//species.findOne(2).then(console.table);

//Youpi ça marche pour l'insertion (mais c'est chiant !!!)

/*
species
  .insert({
    scientific_name: "Citrus fictionus",
    common_name: "bidule",
    family: "citron",
  })
  .then(console.table);
*/

//Youpi ça marche pour la suppression !!!

//species.del(19).then(console.table);

//Youpi ça marche pour l'update !!!

//variety.findOne(1).then(console.table);

/*
variety.update(1, {cultivar : 'I love Chuck Norris'}).then(() => {
    // l'update est terminé, findOne va récupérer la nouvelle version de la ligne d'id 1
    variety.findOne(1).then(console.table);
});
*/


//Youpi les fonctions de sélection selon le goût marchent !!!

//variety.findByMinJuiciness(2).then(console.table);
//variety.findByMaxJuiciness(2).then(console.table);
//variety.findByMinBitterness(2).then(console.table);
//variety.findByMaxBitterness(2).then(console.table);


//ça marche pour les 2 fonctions de recherche par famille ou espèce

//species.findByFamily('orange').then(console.table);
//species.findBySpecies('Citrus aurantium L.').then(console.table);


//Les mêmes mais en version progressive (une suggestion de recherche suffit pour trouver des résultats)

//species.findByFamilyProg('cit').then(console.table);

species.findBySpeciesProg('Citrus x').then(console.table);