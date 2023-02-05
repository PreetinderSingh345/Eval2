const { describe, it, expect } = require('@jest/globals');
const apiServices = require('../../src/services/api');
const apiController = require('../../src/controllers/api');

describe('API services', () => {
  describe('saveCompanies', () => {
    it('should add the companies to the database', async () => {
      const resolvedValue = 'Companies saved successfully';

      jest.spyOn(apiServices, 'saveCompanies').mockResolvedValue(resolvedValue);

      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };

      await apiController.saveCompanies(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().json).toHaveBeenCalledWith(resolvedValue);
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

      jest.spyOn(apiServices, 'getTopRankedSectorCompanies').mockResolvedValue(resolvedValue);

      const mockReq = {
        query: {
          sector: 'Software'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };

      await apiController.getTopRankedSectorCompanies(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().json).toHaveBeenCalledWith(resolvedValue);
    });
  });

  describe('updateCompanyCeoName', () => {
    it('should update the ceo name of the company', async () => {
      const resolvedValue = 'Company CEO name updated successfully';

      jest.spyOn(apiServices, 'updateCompanyCeoName').mockResolvedValue(resolvedValue);

      const mockReq = {
        body: {
          companyId: '1',
          ceo: 'Ceo of Demo Company'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };

      await apiController.updateCompanyCeoName(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.status().json).toHaveBeenCalledWith(resolvedValue);
    });
  });
});