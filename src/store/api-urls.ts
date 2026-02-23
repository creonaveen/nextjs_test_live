/**
 * API URL templates with placeholders
 * Use buildApiUrl() to replace placeholders with actual values
 */
export const apiUrls = {
  getStocksList: '/api/v1/web/index.php?context=stocks',
  getTop50List: '/api/v1/web/index.php?context=top50',
  getIndicesList: '/api/v1/web/index.php?context=index',
  getCompanyList: '/api/v1/web/index.php?context=company',
  getWatchList: '/api/v1/web/index.php?context=watchlist',
  getMyNotes: '/api/v1/web/index.php?context=mynotes',
  getModelPortfolio: '/api/v1/web/index.php?context=model_portfolio',
  getResearchList: '/api/v1/web/index.php?context=wordpress',
  getCompanyDetails: '/api/v1/web/index.php?context=company_analysis',
  getSvg: '/api/v1/web/index.php?context=svgchart',
  getMarketCommentary: '/api/v1/web/index.php?context=market_commentary',
  getAuthorization: '/api/v1/web/index.php?context=authorization',
  getHomePage: '/api/v1/web/index.php?context=home',
  getUserSettings: '/api/v1/web/index.php?context=user_settings',
  getTodaysCase: '/api/v1/web/index.php?context=todayscase',
  getStaticContent: '/api/v1/web/index.php?context=static_content',
  getHealthCheck: '/api/v1/web/index.php?context=health_check',
} as const;

/**
 * Type for API URL keys
 */
export type ApiUrlKey = keyof typeof apiUrls;

/**
 * Parameters for building API URLs
 */
export interface BuildApiUrlParams {
  [key: string]: string;
}

/**
 * Builds an API URL by replacing placeholders in the template
 * @param urlTemplate - The URL template from apiUrls
 * @param params - Parameters to replace in the URL template
 * @returns The built URL with all placeholders replaced
 */
export function buildApiUrl(urlTemplate: string, params?: BuildApiUrlParams): string {
  let url = urlTemplate;

  // Replace all placeholders in the format {key}
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      const placeholder = `{${key}}`;
      if (url.includes(placeholder)) {
        // Validate that the value is not empty for required parameters
        if (!value || value.trim() === '') {
          throw new Error(`Parameter ${key} is required and cannot be empty`);
        }
        url = url.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
      }
    }
  }

  // Check if any placeholders remain (indicating missing parameters)
  const remainingPlaceholders = url.match(/\{[^}]+\}/g);
  if (remainingPlaceholders && remainingPlaceholders.length > 0) {
    throw new Error(`Missing required parameters: ${remainingPlaceholders.join(', ')}`);
  }

  return url;
}
