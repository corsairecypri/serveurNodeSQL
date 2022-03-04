require('dotenv').config();
const express = require('express');
const app = express();
const port = 9900;


app.use(express.json());

const varietiesRouter = require('./routers/varieties');

const speciesRouter = require('./routers/species');

//On associe chaque router à son endpoint spécifique
app.use('/varieties', varietiesRouter);
app.use('/species', speciesRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));