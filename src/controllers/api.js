const apiServices = require('../services/api');

const saveCompanies = async (req, res) => {
    const {urlLink} = req.body;

    res.status(200).json(await apiServices.saveCompanies(urlLink));
}

module.exports = {saveCompanies};