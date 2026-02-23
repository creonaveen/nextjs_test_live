import { renderHook } from '@testing-library/react';

import { useMarketId } from '@/lib/hooks/use-market-id';

import { useNavSections } from '../navbar/navbar-menu';

jest.mock('@/lib/hooks/use-market-id', () => ({
  useMarketId: jest.fn(),
}));

const mockUseMarketId = useMarketId as jest.MockedFunction<typeof useMarketId>;

describe('useNavSections', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all navigation sections by default', () => {
    mockUseMarketId.mockReturnValue('1');

    const { result } = renderHook(() => useNavSections());

    expect(result.current).toHaveLength(5);
    expect(result.current.map((s) => s.value)).toEqual([
      'myPages',
      'market',
      'recommendations',
      'stockPicking',
      'researchAndLearn',
    ]);
  });

  it('should include all recommendation items for non-Denmark market', () => {
    mockUseMarketId.mockReturnValue('1');

    const { result } = renderHook(() => useNavSections());

    const recommendationsSection = result.current.find((s) => s.value === 'recommendations');
    expect(recommendationsSection).toBeDefined();
    expect(recommendationsSection?.items).toHaveLength(2);
    expect(recommendationsSection?.items?.map((i) => i.title)).toEqual([
      'todaysCase',
      'modelPortfolio',
    ]);
  });

  it('should filter out todaysCase and modelPortfolio for market_id 452', () => {
    mockUseMarketId.mockReturnValue('452');

    const { result } = renderHook(() => useNavSections());

    const recommendationsSection = result.current.find((s) => s.value === 'recommendations');

    // For market_id 452, recommendations should be filtered
    // Since all items are filtered, the section might be removed
    if (recommendationsSection) {
      expect(recommendationsSection.items).not.toContainEqual(
        expect.objectContaining({ title: 'todaysCase' })
      );
      expect(recommendationsSection.items).not.toContainEqual(
        expect.objectContaining({ title: 'modelPortfolio' })
      );
    }
  });

  it('should remove recommendations section if all items are filtered', () => {
    mockUseMarketId.mockReturnValue('452');

    const { result } = renderHook(() => useNavSections());

    // When all items in recommendations are filtered, the section should be removed
    const recommendationsSection = result.current.find((s) => s.value === 'recommendations');

    // The section should either not exist or have no items
    expect(recommendationsSection?.items?.length === 0 || !recommendationsSection).toBe(true);
  });

  it('should return all other sections regardless of market_id', () => {
    mockUseMarketId.mockReturnValue('452');

    const { result } = renderHook(() => useNavSections());

    const sectionValues = result.current.map((s) => s.value);
    expect(sectionValues).toContain('myPages');
    expect(sectionValues).toContain('market');
    expect(sectionValues).toContain('stockPicking');
    expect(sectionValues).toContain('researchAndLearn');
  });

  it('should update when market_id changes', () => {
    mockUseMarketId.mockReturnValue('1');
    const { result, rerender } = renderHook(() => useNavSections());

    const initialRecommendations = result.current.find((s) => s.value === 'recommendations');
    expect(initialRecommendations?.items).toHaveLength(2);

    mockUseMarketId.mockReturnValue('452');
    rerender();

    const updatedRecommendations = result.current.find((s) => s.value === 'recommendations');
    // Should be filtered or removed
    expect(updatedRecommendations?.items?.length === 0 || !updatedRecommendations).toBe(true);
  });

  it('should include all myPages items', () => {
    mockUseMarketId.mockReturnValue('1');

    const { result } = renderHook(() => useNavSections());

    const myPagesSection = result.current.find((s) => s.value === 'myPages');
    expect(myPagesSection).toBeDefined();
    expect(myPagesSection?.items).toHaveLength(2);
    expect(myPagesSection?.items?.map((i) => i.title)).toEqual(['watchlist', 'myNotes']);
  });

  it('should include all market items', () => {
    mockUseMarketId.mockReturnValue('1');

    const { result } = renderHook(() => useNavSections());

    const marketSection = result.current.find((s) => s.value === 'market');
    expect(marketSection).toBeDefined();
    expect(marketSection?.items).toHaveLength(3);
    expect(marketSection?.items?.map((i) => i.title)).toEqual([
      'stocks',
      'indices',
      'marketCommentary',
    ]);
  });

  it('should include all stockPicking items', () => {
    mockUseMarketId.mockReturnValue('1');

    const { result } = renderHook(() => useNavSections());

    const stockPickingSection = result.current.find((s) => s.value === 'stockPicking');
    expect(stockPickingSection).toBeDefined();
    expect(stockPickingSection?.items).toHaveLength(1);
    expect(stockPickingSection?.items?.map((i) => i.title)).toEqual(['top50']);
  });

  it('should include researchAndLearn section with subItems', () => {
    mockUseMarketId.mockReturnValue('1');

    const { result } = renderHook(() => useNavSections());

    const researchSection = result.current.find((s) => s.value === 'researchAndLearn');
    expect(researchSection).toBeDefined();
    expect(researchSection?.items).toBeDefined();
    expect(researchSection?.items?.length).toBeGreaterThan(0);

    // Check that some items have subItems
    const itemWithSubItems = researchSection?.items?.find((item) => item.subItems);
    expect(itemWithSubItems).toBeDefined();
  });
});
