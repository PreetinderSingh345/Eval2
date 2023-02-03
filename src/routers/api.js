const express = require('express');
const {saveCompanies, getTopRankedSectorCompanies} = require('../controllers/api');

const apiRouter = express.Router();

apiRouter.post('/save', saveCompanies);
apiRouter.get('/companies', getTopRankedSectorCompanies);

module.exports = apiRouter;