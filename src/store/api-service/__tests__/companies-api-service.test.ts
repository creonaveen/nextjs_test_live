import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/axios';

import { apiUrls } from '../../api-urls';
import {
  companyApiService,
  companyDetailsApiService,
  companyDetailsApiServiceSection,
  useGetCompanyList,
  getCompanyDetailsServer,
  getCompanyDetailsServerSection,
} from '../companies-api-service';

// Mock dependencies
jest.mock('@/lib/axios');
jest.mock('@tanstack/react-query');

describe('companies-api-service', () => {
  const mockCompanyListData = {
    results: [],
    count: 0,
  };
  const mockCompanyDetailData = {
    id: 1,
    name: 'Test Company',
  };
  const mockSectionData = {
    chart_data: 'test',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('companyApiService.getCompanies', () => {
    it('should fetch companies successfully', async () => {
      const mockParams = { page: 1, limit: 10, market_id: '1' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCompanyListData });

      const result = await companyApiService.getCompanies(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getCompanyList, {
        params: mockParams,
      });
      expect(result).toEqual(mockCompanyListData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(companyApiService.getCompanies()).rejects.toThrow('API Error');
    });

    it('should work without params', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCompanyListData });

      const result = await companyApiService.getCompanies();

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getCompanyList, {
        params: undefined,
      });
      expect(result).toEqual(mockCompanyListData);
    });

    it('should handle search query param', async () => {
      const mockParams = { q: 'test search' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCompanyListData });

      await companyApiService.getCompanies(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getCompanyList, {
        params: mockParams,
      });
    });
  });

  describe('companyDetailsApiService.getCompanyDetails', () => {
    it('should fetch company details successfully', async () => {
      const mockParams = { company_id: '123', lang: 'eng' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCompanyDetailData });

      const result = await companyDetailsApiService.getCompanyDetails(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getCompanyDetails, {
        params: mockParams,
      });
      expect(result).toEqual(mockCompanyDetailData);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(
        companyDetailsApiService.getCompanyDetails({ company_id: '123' })
      ).rejects.toThrow('API Error');
    });
  });

  describe('companyDetailsApiServiceSection.getCompanyDetailsSection', () => {
    it('should fetch company details section successfully', async () => {
      const mockParams = { company_id: '123', lang: 'eng', section: 'chart' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockSectionData });

      const result = await companyDetailsApiServiceSection.getCompanyDetailsSection(mockParams);

      expect(apiClient.get).toHaveBeenCalledWith(apiUrls.getCompanyDetails, {
        params: mockParams,
      });
      expect(result).toEqual(mockSectionData);
    });
  });

  describe('useGetCompanyList', () => {
    it('should call useQuery with correct parameters', () => {
      const mockParams = { q: 'test' };
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetCompanyList(mockParams);

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: expect.arrayContaining(['companyList']),
          queryFn: expect.any(Function),
          enabled: true,
        })
      );
    });

    it('should disable query when q param is missing', () => {
      const mockUseQuery = useQuery as jest.Mock;
      mockUseQuery.mockReturnValue({ data: null, isLoading: false });

      useGetCompanyList({});

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          queryFn: expect.any(Function),
          enabled: false,
        })
      );
    });
  });

  describe('getCompanyDetailsServer', () => {
    it('should return company details when params are valid', async () => {
      const mockParams = { company_id: '123', lang: 'eng' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCompanyDetailData });

      const result = await getCompanyDetailsServer(mockParams);

      expect(result).toEqual(mockCompanyDetailData);
    });

    it('should return null when company_id is missing', async () => {
      const result = await getCompanyDetailsServer({});
      expect(result).toBeNull();
    });
  });

  describe('getCompanyDetailsServerSection', () => {
    it('should return section data when params are valid', async () => {
      const mockParams = { company_id: '123', lang: 'eng', section: 'chart' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockSectionData });

      const result = await getCompanyDetailsServerSection(mockParams);

      expect(result).toEqual(mockSectionData);
    });

    it('should return null when company_id is missing', async () => {
      const result = await getCompanyDetailsServerSection({});
      expect(result).toBeNull();
    });
  });
});
