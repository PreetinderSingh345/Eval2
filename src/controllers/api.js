const apiServices = require('../services/api');
const Joi = require('joi');

const saveCompanies = async (req, res) => {
    const {urlLink} = req.body;

    const schema = Joi.object({
        urlLink: Joi.string().required()
    });

    const {error} = schema.validate({urlLink: urlLink});

    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    res.status(200).json(await apiServices.saveCompanies(urlLink));
}

const getTopRankedSectorCompanies = async (req, res) => {
    const {sector} = req.query;

    const schema = Joi.object({
        sector: Joi.string().required()
    });

    const {error} = schema.validate({sector: sector});

    if(error) {
        return res.status(400).json(error.details[0].message);
    }

    res.status(200).json(await apiServices.getTopRankedSectorCompanies(sector));
}

const updateCompanyCeoName = async (req, res) => {
    const {companyId, ceo} = req.body;

    const schema = Joi.object({
        companyId: Joi.string().required(),
        ceo: Joi.string().required()
    });

    const {error} = schema.validate({companyId: companyId, ceo: ceo});

    if(error) {
        return res.status(400).json(error.details[0].message);
    }

    res.status(200).json(await apiServices.updateCompanyCeoName(companyId, ceo));
};

module.exports = {saveCompanies, getTopRankedSectorCompanies, updateCompanyCeoName};