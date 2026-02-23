import { serverApiClient } from '@/lib/server-axios';

import { apiUrls } from '../../api-urls';
import { getCompanyDetailsServerSide } from '../companies-api-service.server';

// Mock dependencies
jest.mock('@/lib/server-axios');

describe('companies-api-service.server', () => {
  const mockResponseData = {
    id: 1,
    name: 'Test Company',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCompanyDetailsServerSide', () => {
    it('should fetch company details successfully', async () => {
      const mockParams = { company_id: '123', lang: 'eng' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      const result = await getCompanyDetailsServerSide(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getCompanyDetails, {
        params: mockParams,
      });
      expect(result).toEqual(mockResponseData);
    });

    it('should throw error when company_id is missing', async () => {
      await expect(getCompanyDetailsServerSide({})).rejects.toThrow('company_id is required');
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (serverApiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(getCompanyDetailsServerSide({ company_id: '123' })).rejects.toThrow('API Error');
    });

    it('should handle section parameter', async () => {
      const mockParams = { company_id: '123', lang: 'eng', section: 'chart' };
      (serverApiClient.get as jest.Mock).mockResolvedValue({ data: mockResponseData });

      await getCompanyDetailsServerSide(mockParams);

      expect(serverApiClient.get).toHaveBeenCalledWith(apiUrls.getCompanyDetails, {
        params: mockParams,
      });
    });
  });
});
