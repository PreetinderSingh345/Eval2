const Joi = require('joi');

const saveCompaniesSchema = Joi.object({
  urlLink: Joi.string().required()
});

const getTopRankedSectorCompaniesSchema = Joi.object({
  sector: Joi.string().required()
});

const updateCompanyCeoNameSchema = Joi.object({
  companyId: Joi.string().required(),
  ceo: Joi.string().required()
});

module.exports = { saveCompaniesSchema, getTopRankedSectorCompaniesSchema, updateCompanyCeoNameSchema };