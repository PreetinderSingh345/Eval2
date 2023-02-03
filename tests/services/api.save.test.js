const { describe, it, expect } = require('@jest/globals');
const apiServices  = require('../../src/services/api');
const {Company} = require('../../database/models');

describe('API services', () => {
    describe('saveCompanies', () => {
        it('should add the companies to the database', async () => {
            const resolvedValue = [
                {
                    "id": 87,
                    "companyId": "296247ef-c553-4704-ad67-0878c87ff729",
                    "name": "HDFC",
                    "ceo": "Antonio Adams",
                    "score": 21.481375,
                    "sector": "Banking",
                    "createdAt": "2023-02-03T09:09:14.923Z",
                    "updatedAt": "2023-02-03T09:09:15.962Z"
                },
                {
                    "id": 85,
                    "companyId": "c1634e16-17c8-42f6-8513-b8c50a4f230c",
                    "name": "Axis",
                    "ceo": "Orville Legros",
                    "score": 26.646825,
                    "sector": "Banking",
                    "createdAt": "2023-02-03T09:09:14.910Z",
                    "updatedAt": "2023-02-03T09:09:15.962Z"
                }
            ];
            
            jest.spyOn(Company, 'findAll').mockResolvedValue(resolvedValue);

            const mockUrlLink = 'https://store-0001.s3.amazonaws.com/input.csv';

            const returnedValue = await apiServices.saveCompanies(mockUrlLink);

            expect(returnedValue).toEqual(resolvedValue);
        });
    });
});