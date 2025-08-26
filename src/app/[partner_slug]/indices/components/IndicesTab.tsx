'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import Paginator from '@/components/custom_components/paginator';
import TableSkeleton from '@/components/custom_components/tableSkeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Index } from '@/lib/types/indices';
import { useGetIndicesList } from '@/store/api_service/indices_api_service';
import { Storage } from '@/store/local_storage';

export default function IndicesTable({ partner_slug }: { partner_slug: string }) {
  const t = useTranslations('common');
  const e = useTranslations('errors');
  const n = useTranslations('navigation');
  const marketId = Storage.getMarketId() || '451'; // Default to Finland market if not set

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

  const [ordering, setOrdering] = useQueryState('ordering', { defaultValue: 'name' }); // Default ordering by name
  const { data, isLoading } = useGetIndicesList(partner_slug, {
    page: pageFromUrl,
    limit: limitFromUrl,
    market_id: marketId,
    ordering: ordering,
  });

  const handleOrdering = (key: string) => {
    setOrdering(ordering === key ? 'name' : String(key));
  };

  const chevronUp = <ChevronUp size={12} className="mt-0.5" />;
  const chevronDown = <ChevronDown size={12} className="mt-0.5" />;

  return (
    <div>
      <div className="pageHeader">{n('indices')}</div>
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
              <TableHead key="close" onClick={() => handleOrdering('close')}>
                <div className={`flex items-center gap-1`}>
                  <span>{t('close')}</span>
                  {ordering === 'close' ? chevronDown : chevronUp}
                </div>
              </TableHead>
              <TableHead key="change" onClick={() => handleOrdering('change')}>
                <div className={`flex items-center gap-1`}>
                  <span>{t('change')}</span>
                  {ordering === 'change' ? chevronDown : chevronUp}
                </div>
              </TableHead>
              <TableHead
                key="profit_loss_percent"
                onClick={() => handleOrdering('profit_loss_percent')}
              >
                <div className={`flex items-center gap-1`}>
                  <span>{'+/- %'}</span>
                  {ordering === 'profit_loss_percent' ? chevronDown : chevronUp}
                </div>
              </TableHead>
              <TableHead key="analysis_date" onClick={() => handleOrdering('analysis_date')}>
                <div className={`flex items-center justify-end gap-1`}>
                  <span>{t('analysisDate')}</span>
                  {ordering === 'analysis_date' ? chevronDown : chevronUp}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableSkeleton rows={10} columns={6} />
          ) : (
            <TableBody>
              {data?.results?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-4 text-center text-gray-500">
                    {e('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                data?.results.map((index: Index) => (
                  <TableRow key={index.ticker}>
                    <TableCell>{index.name}</TableCell>
                    <TableCell>{index.ticker}</TableCell>
                    <TableCell>{parseFloat(index.close).toFixed(2)}</TableCell>
                    <TableCell
                      className={` ${+index.change < 0 ? 'text-red-600' : 'text-green-600'}`}
                    >
                      {parseFloat(index.change).toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={` ${
                        +index.profit_loss_percent < 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {parseFloat(index.profit_loss_percent).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">{index.analysis_date}</TableCell>
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
            pageSizeParent={(limit: number) => setLimitFromUrl(limit)} // keep limit in URL
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
