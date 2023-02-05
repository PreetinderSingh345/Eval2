const { describe, it, expect } = require('@jest/globals');
const apiServices  = require('../../src/services/api');
const {Company} = require('../../database/models');

describe('API services', () => {
  describe('saveCompanies', () => {
    it('should add the companies to the database', async () => {
      const resolvedValue = 'Companies saved successfully';

      jest.spyOn(Company, 'create').mockResolvedValue(resolvedValue);

      const mockUrlLink = 'https://store-0001.s3.amazonaws.com/input.csv';

      const returnedValue = await apiServices.saveCompanies(mockUrlLink);

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
      const resolvedValue = 'Company CEO name updated successfully';

      jest.spyOn(Company, 'update').mockResolvedValue(resolvedValue);

      const mockId = '1';
      const mockCeoName = 'Ceo of Demo Company';

      const returnedValue = await apiServices.updateCompanyCeoName(mockId, mockCeoName);

      expect(returnedValue).toEqual(resolvedValue);
    });
  });
});