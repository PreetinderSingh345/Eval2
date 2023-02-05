const { describe, it, expect } = require('@jest/globals');
const apiServices  = require('../../src/services/api');
const {Company} = require('../../database/models');
const axios = require('axios');

describe('API services', () => {
  describe('saveCompanies', () => {
    it('should add the companies to the database', async () => {
      const resolvedValueAxiosGetUrlLink = "company_id,company_sector\ncompanyId1,sector1\ncompanyId2,sector2";

      jest.spyOn(axios, 'get').mockResolvedValue(resolvedValueAxiosGetUrlLink);

      const resolvedValueAxiosGetCompanyId = {
        "id": "1",
        "name": "Volkswagen",
        "tags": ["Cars", "EV"],
        "ceo": "Ceo of Volkswagen",
        "numberEmployees": 15000
      };

      jest.spyOn(axios, 'get').mockResolvedValue(resolvedValueAxiosGetCompanyId);

      const resolvedValueCompanyCreate = [
        {
          companyId: '1',
          name: 'Meta',
          ceo: 'Ceo of Meta',
          score: 100,
          sector: 'Software'
        },

        {
          companyId: '2',
          name: 'Microsoft',
          ceo: 'Ceo of Microsoft',
          score: 90,
          sector: 'Software'
        }
      ];

      jest.spyOn(Company, 'create').mockResolvedValue(resolvedValueCompanyCreate);

      const resolvedValueAxiosGetCompanySector  =  [{
        "companyId": "1",
        "performanceIndex": [{
            "key": "cpi",
            "value": 0.2
        }, {
            "key": "cf",
            "value": 30000
        },{
            "key": "mau",
            "value": 0.1
        },{
            "key": "roic",
            "value": 20
        }],
      },

      {
      "companyId": "2",
          "performanceIndex": [{
              "key": "cpi",
              "value": 0.2
          }, {
              "key": "cf",
              "value": 50000
          },{
              "key": "mau",
              "value": 0.1
          },{
              "key": "roic",
              "value": 20
          }],
      }];

      jest.spyOn(axios, 'get').mockResolvedValue(resolvedValueAxiosGetCompanySector);

      const resolvedValueCompanyUpdate  = [1];

      jest.spyOn(Company, 'update').mockResolvedValue(resolvedValueCompanyUpdate);

      const resolvedValue = 'Companies saved successfully';

      const returnedValue = await apiServices.saveCompanies();

      expect(returnedValue).toEqual(resolvedValue);
    });
  });

  describe('getTopRankedSectorCompanies', () => {
    it('should return the top ranked companies in the given sector', async () => {
      const resolvedValue = [
        {
          companyId: '1',
          name: 'Meta',
          ceo: 'Ceo of Meta',
          score: 100,
          sector: 'Software'
        },

        {
          companyId: '2',
          name: 'Microsoft',
          ceo: 'Ceo of Microsoft',
          score: 90,
          sector: 'Software'
        }
      ];

      jest.spyOn(Company, 'findAll').mockResolvedValue(resolvedValue);

      const mockSector = 'Software';

      const returnedValue = await apiServices.getTopRankedSectorCompanies(mockSector);

      expect(returnedValue).toEqual(resolvedValue);
    });
  });

  describe('updateCompanyCeoName', () => {
    it('should update the ceo name of the company', async () => {
      const resolvedValue = [1];

      jest.spyOn(Company, 'update').mockResolvedValue(resolvedValue);

      const mockId = '1';
      const mockCeoName = 'Ceo of Demo Company';

      const returnedValue = await apiServices.updateCompanyCeoName(mockId, mockCeoName);

      expect(returnedValue).toEqual("Company CEO name updated successfully");
    });
  });
});