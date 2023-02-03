const apiServices = require('../services/api');
const { saveCompaniesSchema, getTopRankedSectorCompaniesSchema, updateCompanyCeoNameSchema } = require('../schemas/joiApi');

const saveCompanies = async (req, res) => {
  const { urlLink } = req.body;

  const { error } = saveCompaniesSchema.validate({ urlLink: urlLink });

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  res.status(200).json(await apiServices.saveCompanies(urlLink));
};

const getTopRankedSectorCompanies = async (req, res) => {
  const { sector } = req.query;

  const { error } = getTopRankedSectorCompaniesSchema.validate({ sector: sector });

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  res.status(200).json(await apiServices.getTopRankedSectorCompanies(sector));
};

const updateCompanyCeoName = async (req, res) => {
  const { companyId, ceo } = req.body;

  const { error } = updateCompanyCeoNameSchema.validate({ companyId: companyId, ceo: ceo });

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  res.status(200).json(await apiServices.updateCompanyCeoName(companyId, ceo));
};

module.exports = { saveCompanies, getTopRankedSectorCompanies, updateCompanyCeoName };