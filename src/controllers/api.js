const apiServices = require('../services/api');

const saveCompanies = async (req, res) => {
    const {urlLink} = req.body;

    res.status(200).json(await apiServices.saveCompanies(urlLink));
}

const getTopRankedSectorCompanies = async (req, res) => {
    const {sector} = req.query;

    res.status(200).json(await apiServices.getTopRankedSectorCompanies(sector));
}

module.exports = {saveCompanies, getTopRankedSectorCompanies};