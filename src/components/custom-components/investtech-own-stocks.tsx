'use client';

import { Card, CardContent } from 'investtech/external-components';
import * as React from 'react';

/**
 * Props for InvesttechOwnStocks component
 */
interface InvesttechOwnStocksProps {
  /** Information text about Investtech's own stocks */
  ownStocksInfo: string;
}

/**
 * InvesttechOwnStocks - Component displaying Investtech's own stocks information
 *
 * Simple card component displaying information about Investtech's stock holdings.
 *
 * @example
 * ```tsx
 * <InvesttechOwnStocks ownStocksInfo="Investtech holds stocks in..." />
 * ```
 */
const InvesttechOwnStocks = React.memo(function InvesttechOwnStocks({
  ownStocksInfo,
}: InvesttechOwnStocksProps) {
  return (
    <div className="w-full px-0 pt-1 sm:px-4 md:px-6">
      <Card className="rounded-none p-0 sm:rounded-lg">
        <CardContent className="p-5">
          <p className="text-sm leading-relaxed font-medium text-black dark:text-white">
            {ownStocksInfo}
          </p>
        </CardContent>
      </Card>
    </div>
  );
});

export default InvesttechOwnStocks;
