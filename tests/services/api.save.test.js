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
                    id: 1,
                    name: 'Meta',
                    sector: 'Software',
                    rank: 1
                }, 
                {
                    id: 2,
                    name: 'Microsft',
                    sector: 'Software',
                    rank: 2
                }
            ];

            jest.spyOn(Company, 'findAll').mockResolvedValue(resolvedValue);

            const mockSector = 'Software';

            const returnedValue = await apiServices.getTopRankedSectorCompanies(mockSector);

            expect(returnedValue).toEqual(resolvedValue);
        });
    });
});