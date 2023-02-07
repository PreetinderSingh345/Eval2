const axios = require('axios');
const { Company } = require('../../database/models/index');
const Sequelize = require('sequelize')

const saveCompanies = async (urlLink) => {
  const externalApiResponse = await axios.get(urlLink)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });

  let companyInfo = [];

  const companyInfoCsv = externalApiResponse;
  
  const companyInfoSplitByLine = companyInfoCsv.split('\n');

  companyInfoSplitByLine.shift();

  companyInfoSplitByLine.forEach(element => {
    companyInfo.push(element.split(','));
  });

  let uniqueIds = new Set();
  let uniqueSectors = new Set();

  for(const element of companyInfo) {
    const companyId = element[0];
    const companySector = element[1];

    uniqueIds.add(companyId);
    uniqueSectors.add(companySector);
  };

  for(const element of companyInfo) {
    const companyId = element[0];
    const companySector = element[1];

    uniqueSectors.add(companySector);

    const externalApiRespnonseId = await axios.get(`http://54.167.46.10/company/${companyId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });

    const { name, ceo } = externalApiRespnonseId;

    await Company.create({
      companyId: companyId,
      name: name,
      ceo: ceo,
      sector: companySector,
      score: 0
    });
  };

  for(const sector of uniqueSectors) {
    const externalApiResponseSector = await axios.get(`http://54.167.46.10/sector?name=${sector}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });

    const companyInfoSector = externalApiResponseSector;

    for(const element of companyInfoSector) {
      const { companyId, performanceIndex } = element;

      if (uniqueIds.has(companyId)) {
        const cpi = performanceIndex[0]['value'];
        const cf = performanceIndex[1]['value'];
        const mau = performanceIndex[2]['value'];
        const roic = performanceIndex[3]['value'];

        const score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;

        await Company.update({
          score: score
        }, {
          where: {
            companyId: companyId
          }
        });
      }
    };
  };

  const msg = 'Companies saved successfully';

  return msg;
};

const getTopRankedSectorCompanies = async (sector) => {
  const companies = await Company.findAll({
    attributes : [
      'companyId', 'name', 'ceo', 'score',
      [Sequelize.literal('(RANK() OVER (ORDER BY score DESC))'), 'rank']
    ],
    where: {
      sector: sector
    }
  });

  // const companies = await Company.findAll({
  //   where: {
  //     sector: sector
  //   },
  //   order: [
  //     ['score', 'DESC']
  //   ]
  // });

  return companies;
};

const updateCompanyCeoName = async (companyId, ceo) => {
  const updated = await Company.update({
    ceo: ceo
  }, {
    where: {
      companyId: companyId
    }
  });

  const msg = updated[0] ? 'Company CEO name updated successfully' : 'Company not found';

  return msg;
};

module.exports = { saveCompanies, getTopRankedSectorCompanies, updateCompanyCeoName };