const express = require('express');
const {saveCompanies, getTopRankedSectorCompanies, updateCompanyCeoName} = require('../controllers/api');

const apiRouter = express.Router();

apiRouter.post('/save', saveCompanies);
apiRouter.get('/companies', getTopRankedSectorCompanies);
apiRouter.put('/companies', updateCompanyCeoName);

module.exports = apiRouter;