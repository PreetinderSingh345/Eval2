const { describe, it, expect } = require('@jest/globals');
const apiServices  = require('../../src/services/api');
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
});