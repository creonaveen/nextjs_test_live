'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, useToast } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { Spinner } from '@/components/custom-components/spinner';
import { usePlatform } from '@/lib/platform';
import { getLanguageFromStorage } from '@/lib/utils';
import { useModifyWatchlist } from '@/store/api-service/watchlist-api-service';

interface AddToWatchlistProps {
  companyId: string;
  companyName: string;
  isInWatchlist?: boolean;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
  labels?: {
    addToWatchlistLabel?: string;
    removeFromWatchlistLabel?: string;
    addedToWatchlistLabel?: string;
    removedFromWatchlistLabel?: string;
  };
}

function extractApiErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null;

  const response = (error as { response?: { data?: { message?: string } } }).response;
  const message = response?.data?.message;

  return typeof message === 'string' ? message : null;
}

function getErrorMessage(error: unknown, wasRemoving: boolean, e: (key: string) => string): string {
  const apiMessage = extractApiErrorMessage(error);
  if (apiMessage) return apiMessage;

  return wasRemoving
    ? e('errorRemovingFromWatchlist') ||
        'Failed to remove company from watchlist. Please try again.'
    : e('errorAddingToWatchlist') || 'Failed to add company to watchlist. Please try again.';
}

function showSuccessToast(params: {
  toast: ReturnType<typeof useToast>['toast'];
  companyName: string;
  wasRemoving: boolean;
  labels?: AddToWatchlistProps['labels'];
  position: 'bottom-center' | 'top-right';
}) {
  const { toast, companyName, wasRemoving, labels, position } = params;

  toast({
    title: companyName,
    description: wasRemoving ? labels?.removedFromWatchlistLabel : labels?.addedToWatchlistLabel,
    position,
  });
}

function showErrorToast(params: {
  toast: ReturnType<typeof useToast>['toast'];
  title: string;
  message: string;
  position: 'bottom-center' | 'top-right';
}) {
  const { toast, title, message, position } = params;

  toast({
    title,
    description: message,
    position,
  });
}

function useWatchlistAction(params: {
  companyId: string;
  companyName: string;
  isAdded: boolean;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
  labels?: AddToWatchlistProps['labels'];
}) {
  const { companyId, companyName, isAdded, setIsAdded, onRefreshData, isRefetching, labels } =
    params;

  const { toast } = useToast();
  const platform = usePlatform();
  const language = getLanguageFromStorage();
  const modifyWatchlist = useModifyWatchlist();
  const e = useTranslations('errors');

  const position = platform === 'mobile' ? 'bottom-center' : 'top-right';
  // Only show loading when this component's action is pending; ignore isRefetching
  // so we don't show loading when another action (e.g. Take Notes save) triggers a refetch.
  const isLoading = modifyWatchlist.isPending;

  const handleClick = async () => {
    if (isLoading || isRefetching) return;

    const wasRemoving = isAdded;
    const companyIdParam = wasRemoving ? `-${companyId}` : companyId;

    try {
      await modifyWatchlist.mutateAsync({
        company_id: companyIdParam,
        lang: language,
      });

      await onRefreshData?.();
      setIsAdded(!wasRemoving);

      showSuccessToast({
        toast,
        companyName,
        wasRemoving,
        labels,
        position,
      });
    } catch (error) {
      showErrorToast({
        toast,
        title: e('error') || 'Error',
        message: getErrorMessage(error, wasRemoving, e),
        position,
      });
    }
  };

  return { handleClick, isLoading };
}

export const AddToWatchlist = React.memo(function AddToWatchlist({
  companyId,
  companyName,
  isInWatchlist = false,
  onRefreshData,
  isRefetching,
  labels,
}: AddToWatchlistProps) {
  const [isAdded, setIsAdded] = useState(isInWatchlist);
  const platform = usePlatform();
  const t = useTranslations('common');

  useEffect(() => {
    setIsAdded(isInWatchlist);
  }, [isInWatchlist]);

  const { handleClick, isLoading } = useWatchlistAction({
    companyId,
    companyName,
    isAdded,
    setIsAdded,
    onRefreshData,
    isRefetching,
    labels,
  });

  const buttonLabel = isAdded ? labels?.removeFromWatchlistLabel : labels?.addToWatchlistLabel;

  return (
    <Button
      id="add-to-watchlist-button"
      variant={isAdded ? 'outline' : 'accentRound'}
      onClick={() => void handleClick()}
      disabled={isLoading}
      className={platform === 'mobile' ? 'w-full' : ''}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          {t('loading')}
          <Spinner />
        </span>
      ) : (
        buttonLabel
      )}
    </Button>
  );
});
