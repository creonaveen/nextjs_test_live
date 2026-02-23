import { Card, CardTitle, CardHeader, CardContent } from 'investtech/external-components';
import { TriangleAlertIcon } from 'lucide-react';

import { DataAndCalculationWarningsSection } from '@/lib/types/health-check';
import { RenderHTML } from '@/utils/create-mark-up';

export default function WarningsSection({ data }: { data: DataAndCalculationWarningsSection }) {
  return (
    <Card className="h-full space-y-3 rounded-none px-4 py-4 sm:rounded-xl sm:p-5">
      <CardHeader className="mb-2">
        <CardTitle>
          <div className="flex items-center gap-3">
            <TriangleAlertIcon className="text-warning-text dark:text-warning-text h-6 w-6" />
            <span className="text-grey-900 dark:text-grey-50 font-semibold">
              {data.title ?? ''}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-grey-800 dark:text-grey-100 flex flex-1 flex-col gap-2 px-0 text-sm font-semibold lg:gap-4">
        {data.warnings.map((warning, index) => (
          <div key={`${'warning'}-${index}`}>
            <RenderHTML html={warning.message || ''} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
