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
});