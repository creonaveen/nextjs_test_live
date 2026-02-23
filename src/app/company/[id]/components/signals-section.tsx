'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from 'investtech/external-components';
import { Card, CardContent, CardHeader, CardTitle } from 'investtech/external-components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';

import { getUrlWithParams } from '@/utils/navigation-utils';
import { getCompanyColorClass } from '@/lib/utils';

import {
  CompanySectionCurrentSignals,
  CompanySectionCurrentSignalsData,
  CurrentSignalsLabelsAndTexts,
  HelpDataData,
  Signal,
  Signals,
} from '@/lib/types/company';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface SignalsProps {
  data: CompanySectionCurrentSignals;
}

interface SignalCardProps {
  signal: Signal;
  labelsAndTexts: CurrentSignalsLabelsAndTexts;
}

/* -------------------------------------------------------------------------- */
/*                               SIGNAL CARD                                  */
/* -------------------------------------------------------------------------- */

function SignalCard({ signal, labelsAndTexts }: SignalCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    if (!signal.post_name) return;
    router.push(getUrlWithParams(`/docs/${signal.post_name}`, searchParams));
  };

  return (
    <Card
      className="border-grey-200 dark:bg-grey-900 cursor-pointer space-y-3 border p-4 shadow-md dark:border-none dark:shadow-none"
      onClick={handleClick}
      id={`signal-card-${signal.post_name}`}
    >
      <CardHeader className="p-0 pb-3">
        <CardTitle className="text-grey-800 dark:text-grey-50 truncate text-xs font-semibold md:text-base">
          {signal.title ?? ''}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col items-center gap-3">
          <SignalImages signal={signal} />
          <SignalStatisticsBadge signal={signal} labelsAndTexts={labelsAndTexts} />
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SIGNAL IMAGES                                 */
/* -------------------------------------------------------------------------- */

function SignalImages({ signal }: { signal: Signal }) {
  return (
    <>
      {/* Light small */}
      <div className="mb-3 block md:hidden dark:hidden">
        <Image
          src={signal.help_teaser_image.src_light ?? ''}
          alt={signal.title}
          width={140}
          height={120}
        />
      </div>

      {/* Dark small */}
      <div className="mb-3 hidden dark:block dark:md:hidden">
        <Image
          src={signal.help_teaser_image.src_dark ?? ''}
          alt={signal.title}
          width={140}
          height={120}
        />
      </div>

      {/* Light large */}
      <div className="mb-3 hidden md:block dark:md:hidden">
        <Image
          src={signal.help_teaser_image.src_light_big ?? ''}
          alt={signal.title}
          width={200}
          height={140}
        />
      </div>

      {/* Dark large */}
      <div className="mb-3 hidden dark:md:block">
        <Image
          src={signal.help_teaser_image.src_dark_big ?? ''}
          alt={signal.title}
          width={200}
          height={140}
        />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                         SIGNAL STATISTICS BADGE                             */
/* -------------------------------------------------------------------------- */

function SignalStatisticsBadge({ signal, labelsAndTexts }: SignalCardProps) {
  if (!signal.has_statistics || !signal.statistics || !signal.statistics.color) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        className={`${getCompanyColorClass(
          signal.statistics.color,
          'background'
        )} flex flex-col items-center gap-3 rounded-sm p-4`}
      >
        <div
          className={`${getCompanyColorClass(
            signal.statistics.color,
            'text'
          )} flex items-center gap-3 text-sm font-bold sm:text-lg`}
        >
          <Image src={signal.arrow_image.src} alt="arrow" width={16} height={20} />
          {signal.statistics.annual_excess_return ?? ''} {labelsAndTexts.pp ?? ''}
        </div>

        <p className="text-grey-800 dark:text-grey-400 text-center text-xs">
          {signal.statistics.num_signals_text ?? ''}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SECTION HEADER                                 */
/* -------------------------------------------------------------------------- */

function SignalsHeader({ labelsAndTexts }: { labelsAndTexts: CurrentSignalsLabelsAndTexts }) {
  return (
    <CardHeader className="mb-6 flex flex-col space-y-2 p-0 sm:space-y-4 lg:flex-row lg:justify-between">
      <CardTitle className="lg:w-1/2">
        <p className="text-grey-700 dark:text-grey-200 text-xs font-medium uppercase">
          {labelsAndTexts.sub_title ?? ''}
        </p>
        <p className="dark:text-grey-50 text-2xl font-medium md:text-[32px]">
          {labelsAndTexts.module_title ?? ''}
        </p>
      </CardTitle>

      <div className="lg:w-1/2 lg:text-right">
        <p className="dark:text-grey-50 text-sm lg:text-base">
          {labelsAndTexts.help_data?.data?.teaser_text_short ?? ' '}
          {labelsAndTexts.help_data?.data && (
            <HelpDialog
              helpData={labelsAndTexts.help_data.data}
              helpLabel={labelsAndTexts.see_more ?? ''}
            />
          )}
        </p>
      </div>
    </CardHeader>
  );
}

/* -------------------------------------------------------------------------- */
/*                             SIGNALS SECTION                                 */
/* -------------------------------------------------------------------------- */

export const SignalsSection = React.memo(function SignalsSection({ data }: SignalsProps) {
  const labelsAndTexts = data.labels_and_texts;
  const signalsData: CompanySectionCurrentSignalsData = data.data;

  const availableSignals = useMemo(() => {
    return Object.keys(signalsData.signals)
      .filter((key) => signalsData.signals[key as keyof Signals]?.title)
      .map((key) => ({
        signal: signalsData.signals[key as keyof Signals],
        type: key,
      }));
  }, [signalsData.signals]);

  return (
    <div className="sm:px-4 sm:pt-8 md:px-6">
      <Card className="rounded-none p-5 sm:rounded-xl">
        <SignalsHeader labelsAndTexts={labelsAndTexts} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {availableSignals.map(({ signal, type }, index) => (
            <SignalCard key={`${type}_${index}`} signal={signal} labelsAndTexts={labelsAndTexts} />
          ))}
        </div>
      </Card>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/*                                HELP DIALOG                                 */
/* -------------------------------------------------------------------------- */

function HelpDialog({ helpData, helpLabel }: { helpData: HelpDataData; helpLabel: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="m-0 h-auto p-0 text-sm underline">
          {helpLabel}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{helpData.title ?? ''}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{helpData.teaser_text ?? ''}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
