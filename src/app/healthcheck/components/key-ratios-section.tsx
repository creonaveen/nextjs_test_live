import { Button } from 'investtech/external-components';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';
import { Table, TableBody, TableCell, TableRow } from 'investtech/external-components';
import { Link } from '@/components/link';

import { KPIsSection } from '@/lib/types/health-check';

interface KeyRatiosSectionProps {
  data: KPIsSection;
}

export function KeyRatiosSection({ data }: KeyRatiosSectionProps) {
  return (
    <Card className="h-full space-y-2 rounded-none px-4 pt-4 pb-3 sm:rounded-xl sm:p-5 lg:space-y-3">
      <CardHeader>
        <CardTitle>{data.title ?? ''}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-0">
        <Table>
          <TableBody>
            {data.kpi_table_formatted.map((kpi) => (
              <TableRow
                key={kpi.key}
                className="text-grey-800 dark:text-grey-50 text-sm"
                showHover={false}
              >
                <TableCell className="text-left">{kpi.key ?? ''}</TableCell>
                <TableCell className="text-right">{kpi.value ?? ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr className="hr" />
      </CardContent>
      <CardFooter className="mt-6 flex flex-col items-start gap-3">
        <span className="text-sm font-normal">{data?.kpi_table?.caption ?? ''}</span>
        <hr className="horizontal-divider w-full" />
        <Link href={`/docs/${data.help_data.help_source ?? ''}`} className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="mt-3 w-full sm:w-auto">
            {data.help_data.label ?? ''}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
