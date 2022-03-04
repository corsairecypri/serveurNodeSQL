const { Router } = require("express");

const species = require("../model/species");

const router = new Router();

//GET

router.get("/", async (req, res) => {

    const allSpecies = await species.findAll();

    res.status(200).json(allSpecies);
});

router.get("/:speciesId", async (req, res) => {
    const oneSpecies = await  species.findOne(req.params.speciesId);

    res.status(200).json(oneSpecies);
})

//POST

router.post("/", async (req, res) => {

    await species.insert(req.body);

    res.status(201).json("OK")
})

//DELETE

router.delete("/:speciesId", async (req, res) => {
    
    await species.del(req.params.speciesId);

    res.status(204).json("OK");
});

//PUT

//Attention pour l'UPDATE, les colonnes scientific_name et commun_name
//sont soumis à des contraintes d'UNICITé

router.put("/:speciesId", async (req, res) => {
    console.log(req.body);

    await species.update(req.params.speciesId, req.body);

    res.status(200).json("OK")
});

module.exports = router;