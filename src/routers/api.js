const express = require('express');
const {saveCompanies} = require('../controllers/api');

const apiRouter = express.Router();

apiRouter.post('/save', saveCompanies);

module.exports = apiRouter;