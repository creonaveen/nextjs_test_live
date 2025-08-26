'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';

import { DropdownMenuComponent } from '@/components/custom_components/dropdownMenu';
import Paginator from '@/components/custom_components/paginator';
import TableSkeleton from '@/components/custom_components/tableSkeleton';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Top50 } from '@/lib/types/top50';
import { useGetTop50List } from '@/store/api_service/top50_api_service';
import { Storage } from '@/store/local_storage';

type Option = {
  value: string;
  label: string;
};

export function Top50Table({ partner_slug }: { partner_slug: string }) {
  const t = useTranslations('common');
  const e = useTranslations('errors');
  const marketId = Storage.getMarketId() || '451'; // Default to Finland market if not set
  const [ordering, setOrdering] = useQueryState('ordering', { defaultValue: 'name' }); // Default ordering by name

  const [pageFromUrl, setPageFromUrl] = useQueryState('page', {
    defaultValue: 1,
    parse: Number,
    serialize: (v: number) => String(v),
  });

  const [limitFromUrl, setLimitFromUrl] = useQueryState('limit', {
    defaultValue: 10,
    parse: Number,
    serialize: (v: number) => String(v),
  });

  const buyOrSellOptions: Option[] = [
    { value: 'allCandidates', label: t('allCandidates') },
    { value: 'buy', label: t('buyCandidates') },
    { value: 'sell', label: t('sellCandidates') },
  ];

  const timeSpanOptions: Option[] = [
    { value: 'timeSpan', label: t('timeSpan') },
    { value: 'medium', label: t('mediumTerm') },
    { value: 'long', label: t('longTerm') },
  ];

  const [buyOrSell, setBuyOrSell] = useQueryState<Option | null>('buy_or_sell', {
    defaultValue: null, // default value
    parse: (value: string | null) =>
      buyOrSellOptions.find((option) => option.value === value) || null,
    serialize: (value: Option | null) => value?.value ?? '', // undefined removes from URL
  });

  const [timeSpan, setTimeSpan] = useQueryState<Option | null>('time_span', {
    defaultValue: null, // default value
    parse: (value: string | null) =>
      timeSpanOptions.find((option) => option.value === value) || null,
    serialize: (value: Option | null) => value?.value ?? '', // undefined removes from URL
  });

  const { data, isLoading } = useGetTop50List(partner_slug, {
    page: pageFromUrl,
    limit: limitFromUrl,
    market_id: marketId,
    ordering: ordering,
    buyOrSell: buyOrSell?.value, // Default to 'buy' if not set
    timespan: timeSpan?.value, // Default to 'medium' if not set
  });

  const handleOrdering = (key: string) => {
    setOrdering(ordering === key ? 'name' : String(key));
  };

  const handleLimitChange = (newLimit: number) => {
    setLimitFromUrl(newLimit);
    setBuyOrSell(null); // remove from URL
    setTimeSpan(null); // remove from URL
  };

  const handleBuyOrSellChange = (option: Option | null) => {
    // Clear URL if 'allCandidates' is selected (default option)
    if (option?.value === 'allCandidates') {
      setBuyOrSell(null);
    } else {
      setBuyOrSell(option);
    }
    setPageFromUrl(1);
  };

  const handleTimeSpanChange = (option: Option | null) => {
    // Clear URL if 'timeSpan' is selected (default option)
    if (option?.value === 'timeSpan') {
      setTimeSpan(null);
    } else {
      setTimeSpan(option);
    }
    setPageFromUrl(1);
  };

  useEffect(() => {
    // buyOrSell changed
  }, [buyOrSell]);

  const chevronUp = <ChevronUp size={12} className="mt-0.5" />;
  const chevronDown = <ChevronDown size={12} className="mt-0.5" />;

  return (
    <div>
      <div className="pageHeader">{'Top50'}</div>
      {/* Filters can be added here if needed */}
      <div className="mb-4 flex justify-end gap-8">
        <DropdownMenuComponent
          selectedOption={buyOrSell}
          onSelect={handleBuyOrSellChange}
          options={buyOrSellOptions}
        />
        <DropdownMenuComponent
          selectedOption={timeSpan}
          onSelect={handleTimeSpanChange}
          options={timeSpanOptions}
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-sm">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead key="name" onClick={() => handleOrdering('name')}>
                <div className={`flex items-center gap-1`}>
                  <span>{t('name')}</span>
                  {ordering === 'name' ? chevronDown : chevronUp}
                </div>
              </TableHead>
              <TableHead key="ticker" onClick={() => handleOrdering('ticker')}>
                <div className={`flex items-center gap-1`}>
                  <span>{'Ticker'}</span>
                  {ordering === 'ticker' ? chevronDown : chevronUp}
                </div>
              </TableHead>
              <TableHead key="score" onClick={() => handleOrdering('score')}>
                <div className={`flex items-center gap-1`}>
                  <span>{t('score')}</span>
                  {ordering === 'score' ? chevronDown : chevronUp}
                </div>
              </TableHead>
              <TableHead key="close" onClick={() => handleOrdering('close')} className="text-right">
                <div className={`flex items-center justify-end gap-1`}>
                  <span>{'Close'}</span>
                  {ordering === 'close' ? chevronDown : chevronUp}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableSkeleton rows={10} columns={4} />
          ) : (
            <TableBody>
              {data?.results?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-4 text-center text-gray-500">
                    {e('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                data?.results.map((top50: Top50) => (
                  <TableRow key={top50.ticker}>
                    <TableCell>{top50.name}</TableCell>
                    <TableCell>{top50.ticker}</TableCell>
                    <TableCell>{parseFloat(top50.score ? top50.score : '0').toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {parseFloat(top50.close).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex w-full justify-end">
        {data?.results && data?.count > 5 && (
          <Paginator
            pageParent={(page: number) => setPageFromUrl(page)} // keep page in URL
            pageSizeParent={handleLimitChange} // keep limit in URL
            pageSize={limitFromUrl}
            isAPILoad={isLoading}
            countRow={data?.count}
            updateCurrentPage={pageFromUrl}
          />
        )}
      </div>
    </div>
  );
}
