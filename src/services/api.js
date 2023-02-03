const axios = require('axios');

const {Company} = require('../../database/models/index');

const saveCompanies = async (urlLink) => {
    const externalApiResponse = await axios.get(urlLink);

    let companyInfo=[];

    const companyInfoCsv = externalApiResponse.data;

    const companyInfoSplitByLine=companyInfoCsv.split('\n');

    companyInfoSplitByLine.shift();

    companyInfoSplitByLine.forEach(element => {
        companyInfo.push(element.split(','))
    });

    companyInfo.forEach(async element => {
        const companyId = element[0];
        const companySector = element[1];

        const externalApiRespnonseId = await axios.get(`http://54.167.46.10/company/${companyId}`);

        const {name, ceo} = externalApiRespnonseId.data;

        const company = await Company.create({
            companyId: companyId,
            name: name,
            ceo: ceo,
            sector: companySector,
            score: 0
        });
    });

    return urlLink;
};

module.exports = {saveCompanies};