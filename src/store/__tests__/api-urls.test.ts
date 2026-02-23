import { apiUrls } from '../api-urls';

describe('apiUrls', () => {
  it('should contain all required API URL templates', () => {
    expect(apiUrls).toHaveProperty('getStocksList');
    expect(apiUrls).toHaveProperty('getTop50List');
    expect(apiUrls).toHaveProperty('getIndicesList');
    expect(apiUrls).toHaveProperty('getCompanyList');
    expect(apiUrls).toHaveProperty('getWatchList');
    expect(apiUrls).toHaveProperty('getMyNotes');
    expect(apiUrls).toHaveProperty('getModelPortfolio');
    expect(apiUrls).toHaveProperty('getResearchList');
    expect(apiUrls).toHaveProperty('getCompanyDetails');
    expect(apiUrls).toHaveProperty('getSvg');
    expect(apiUrls).toHaveProperty('getMarketCommentary');
    expect(apiUrls).toHaveProperty('getAuthorization');
    expect(apiUrls).toHaveProperty('getHomePage');
    expect(apiUrls).toHaveProperty('getUserSettings');
    expect(apiUrls).toHaveProperty('getTodaysCase');
    expect(apiUrls).toHaveProperty('getStaticContent');
    expect(apiUrls).toHaveProperty('getHealthCheck');
  });

  it('should have correct URL patterns', () => {
    expect(apiUrls.getStocksList).toBe('/api/v1/web/index.php?context=stocks');
    expect(apiUrls.getTop50List).toBe('/api/v1/web/index.php?context=top50');
    expect(apiUrls.getIndicesList).toBe('/api/v1/web/index.php?context=index');
    expect(apiUrls.getCompanyList).toBe('/api/v1/web/index.php?context=company');
    expect(apiUrls.getWatchList).toBe('/api/v1/web/index.php?context=watchlist');
    expect(apiUrls.getMyNotes).toBe('/api/v1/web/index.php?context=mynotes');
    expect(apiUrls.getModelPortfolio).toBe('/api/v1/web/index.php?context=model_portfolio');
    expect(apiUrls.getResearchList).toBe('/api/v1/web/index.php?context=wordpress');
    expect(apiUrls.getCompanyDetails).toBe('/api/v1/web/index.php?context=company_analysis');
    expect(apiUrls.getSvg).toBe('/api/v1/web/index.php?context=svgchart');
    expect(apiUrls.getMarketCommentary).toBe('/api/v1/web/index.php?context=market_commentary');
    expect(apiUrls.getAuthorization).toBe('/api/v1/web/index.php?context=authorization');
    expect(apiUrls.getHomePage).toBe('/api/v1/web/index.php?context=home');
    expect(apiUrls.getUserSettings).toBe('/api/v1/web/index.php?context=user_settings');
    expect(apiUrls.getTodaysCase).toBe('/api/v1/web/index.php?context=todayscase');
    expect(apiUrls.getStaticContent).toBe('/api/v1/web/index.php?context=static_content');
    expect(apiUrls.getHealthCheck).toBe('/api/v1/web/index.php?context=health_check');
  });
});
