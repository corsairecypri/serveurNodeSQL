const { Router } = require("express");

const variety = require("../model/variety");

const router = new Router();

/*
NOTE : quand on informe le endpoint dans l'index.js, on évite de le répéter
dans le router pour éviter de devoir écrire des doublons dans le endpoint
*/

//Les routes GET

router.get("", async (req, res) => {
  const varieties = await variety.findAll();

  res.status(200).json(varieties);
});

router.get("/:varietiesId", async (req, res) => {
    const oneVariety = await  variety.findOne(req.params.varietiesId);

    res.status(200).json(oneVariety);
})

//Les routes POST

router.post("/", async (req, res) => {
  await varieties.insert(req.body);

  res.status(201).json("OK");
});



//Les routes DELETE

router.delete("/:varietiesId", async (req, res) => {
  await variety.del(req.params.varietiesId);

  res.status(204).json("OK");
});

//Les routes UPDATE

/*Note : pour connaître les données de la table des variétés, utilisez findOne().
(cultivar, juiciness, bitterness, species_id)
(findAll possède un join avec la table species, donc affiche des données venant des
2 tables)
*/

router.put("/:varietiesId", async (req, res) => {
  console.log(req.body);

  await variety.update(req.params.varietiesId, req.body);



  res.status(200).json("OK");
});


//La route des goûts

/*Exemple de req.body pour critera :
{"juiciness" : { "max" : 3},
 "bitterness": { "min" : 2 }
}*/

router.post("/filter/scores", async (req, res) => {

   const critera = req.body

   const choice = await variety.findBetween(critera);

   res.json(choice)
})

module.exports = router;
