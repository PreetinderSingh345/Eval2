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

    let uniqueIds = new Set();
    let uniqueSectors = new Set();

    companyInfo.forEach(async element => {
        const companyId = element[0];
        const companySector = element[1];

        uniqueIds.add(companyId);
        uniqueSectors.add(companySector);
    });

    companyInfo.forEach(async element => {
        const companyId = element[0];
        const companySector = element[1];

        uniqueSectors.add(companySector);

        const externalApiRespnonseId = await axios.get(`http://54.167.46.10/company/${companyId}`);

        const {name, ceo} = externalApiRespnonseId.data;

        await Company.create({
            companyId: companyId,
            name: name,
            ceo: ceo,
            sector: companySector,
            score: 0
        });
    });

    uniqueSectors.forEach(async sector => {
        const externalApiResponseSector = await axios.get(`http://54.167.46.10/sector?name=${sector}`);

        const companyInfoSector = externalApiResponseSector.data;

        companyInfoSector.forEach(async element => {
            const {companyId, performanceIndex} = element;

            if(uniqueIds.has(companyId)) {
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
        });
    });

    const msg = 'Companies saved successfully';

    return msg
};

const getTopRankedSectorCompanies = async (sector) => {
    const companies = await Company.findAll({
        where: {
            sector: sector
        },
        order: [
            ['score', 'DESC']
        ]
    });

    return companies;
};

module.exports = {saveCompanies, getTopRankedSectorCompanies};