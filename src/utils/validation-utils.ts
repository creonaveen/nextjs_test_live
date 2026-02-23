import { configuration } from '@/environment/configuration';

export interface ValidationError {
  isValid: boolean;
  error?: string;
}

// Define proper types from configuration
type MarketId = (typeof configuration.VALID_MARKET_IDS)[number];
type Language = (typeof configuration.VALID_LANGUAGES)[number];

/**
 * Validates that market_id is in the list of valid market IDs
 * This is the PRIMARY validation method - checks against configuration
 *
 * @param urlMarketId - market_id from URL query parameter
 * @returns ValidationError object
 */
export function validateMarketIdAgainstList(
  urlMarketId: string | null | undefined
): ValidationError {
  // If no market_id in URL, validation passes (optional parameter)
  if (!urlMarketId) {
    return { isValid: true };
  }

  // Check if market_id is in the list of valid market IDs
  const validMarketIds: readonly MarketId[] = configuration.VALID_MARKET_IDS;

  // Type-safe check: cast to MarketId only for the includes check
  // This is safe because we're checking against the actual valid list
  if (!validMarketIds.includes(urlMarketId as MarketId)) {
    return {
      isValid: false,
      error: `Invalid market ID "${urlMarketId}". Valid market IDs are: ${validMarketIds.join(', ')}`,
    };
  }

  return { isValid: true };
}

/**
 * Validates that language is in the list of valid languages
 * This is the PRIMARY validation method - checks against configuration
 *
 * @param urlLanguage - language from URL query parameter
 * @returns ValidationError object
 */
export function validateLanguageAgainstList(
  urlLanguage: string | null | undefined
): ValidationError {
  // If no language in URL, validation passes (optional parameter)
  if (!urlLanguage) {
    return { isValid: true };
  }

  // Check if language is in the list of valid languages
  const validLanguages: readonly Language[] = configuration.VALID_LANGUAGES;

  // Type-safe check: cast to Language only for the includes check
  // This is safe because we're checking against the actual valid list
  if (!validLanguages.includes(urlLanguage as Language)) {
    return {
      isValid: false,
      error: `Invalid language "${urlLanguage}". Valid languages are: ${validLanguages.join(', ')}`,
    };
  }

  return { isValid: true };
}
