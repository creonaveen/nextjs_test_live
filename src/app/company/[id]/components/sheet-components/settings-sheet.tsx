'use client';

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from 'investtech/external-components';
import { Settings } from 'lucide-react';

import { usePlatform } from '@/lib/platform';
import { MainChartLabelsAndTexts } from '@/lib/types/company';
import { MainChartSettings } from '@/lib/types/user-settings';
import { ChartSettings } from './settings-chart-section';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface SettingsSheetProps {
  main_chart_settings: MainChartSettings;
  labelsAndTexts: MainChartLabelsAndTexts;
  onIndicatorToggle?: (indicatorId: number) => void;
  onSettingsChange?: (tooltipSetting: number) => void;
}

/* -------------------------------------------------------------------------- */
/* Main Sheet                                                                 */
/* -------------------------------------------------------------------------- */

export function SettingsSheet(props: SettingsSheetProps) {
  const platform = usePlatform();
  const isDesktop = platform === 'desktop';

  return (
    <Sheet>
      <SettingsTrigger />
      <SettingsContent isDesktop={isDesktop} {...props} />
    </Sheet>
  );
}

/* -------------------------------------------------------------------------- */
/* Trigger                                                                    */
/* -------------------------------------------------------------------------- */

function SettingsTrigger() {
  return (
    <SheetTrigger asChild id="company-page-settings-sheet-trigger">
      <Button variant="outline" size="icon" className="border-primary size-8 cursor-pointer">
        <Settings className="size-4" />
      </Button>
    </SheetTrigger>
  );
}

/* -------------------------------------------------------------------------- */
/* Sheet Content                                                              */
/* -------------------------------------------------------------------------- */

function SettingsContent({
  isDesktop,
  main_chart_settings,
  labelsAndTexts,
  onIndicatorToggle,
  onSettingsChange,
}: SettingsSheetProps & { isDesktop: boolean }) {
  return (
    <SheetContent
      side={isDesktop ? 'right' : 'bottom'}
      className={isDesktop ? 'h-auto px-5 pt-5 pb-5 md:pb-10' : 'h-[100dvh] rounded-none p-0'}
      id="company-page-settings-sheet"
    >
      <SheetTitle className="sr-only">Chart Settings</SheetTitle>
      <SheetDescription className="sr-only">
        Configure chart indicators and tooltip settings
      </SheetDescription>

      {isDesktop ? (
        <DesktopLayout
          labelsAndTexts={labelsAndTexts}
          main_chart_settings={main_chart_settings}
          onIndicatorToggle={onIndicatorToggle}
          onSettingsChange={onSettingsChange}
        />
      ) : (
        <MobileLayout
          labelsAndTexts={labelsAndTexts}
          main_chart_settings={main_chart_settings}
          onIndicatorToggle={onIndicatorToggle}
          onSettingsChange={onSettingsChange}
        />
      )}
    </SheetContent>
  );
}

/* -------------------------------------------------------------------------- */
/* Layouts                                                                    */
/* -------------------------------------------------------------------------- */

function MobileLayout(props: SettingsSheetProps) {
  return (
    <div className="flex h-full flex-col">
      <MobileHeader title={props.labelsAndTexts.technical_indicators} />
      <ScrollableBody {...props} />
    </div>
  );
}

function DesktopLayout(props: SettingsSheetProps) {
  return (
    <div className="mt-8 space-y-8 overflow-y-auto pr-2 md:pb-10">
      <Header title={props.labelsAndTexts.technical_indicators} />
      <ChartSettings {...props} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Headers                                                                    */
/* -------------------------------------------------------------------------- */

function Header({ title }: { title: string }) {
  return <p className="text-base font-semibold text-black dark:text-white">{title}</p>;
}

function MobileHeader({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-10 mt-8 space-y-8 px-5 py-4">
      <Header title={title} />
    </div>
  );
}

function ScrollableBody(props: SettingsSheetProps) {
  return (
    <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6">
      <ChartSettings {...props} />
    </div>
  );
}
