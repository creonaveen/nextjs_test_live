'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import { usePlatform } from '@/lib/platform';
import { MyNotesList } from '@/lib/types/my-notes';
import { getLanguageFromStorage, getResponsiveHideClass } from '@/lib/utils';
import { useDeleteMyNotes, useGetMyNotes } from '@/store/api-service/mynotes-api-service';

const DELETE_ACTION = 'modify' as const;

function useMyNotesQueryState() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
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
  const [ordering, setOrdering] = useQueryState('ordering', { defaultValue: 'date' });
  const language = getLanguageFromStorage();
  const {
    data,
    isLoading,
    isRefetching,
    isError: isFetchError,
    refetch,
  } = useGetMyNotes({
    page: pageFromUrl,
    limit: limitFromUrl,
    ordering: ordering,
    lang: language,
  });
  const myNotesData = data as MyNotesList | undefined;
  return {
    selectedNoteId,
    setSelectedNoteId,
    pageFromUrl,
    setPageFromUrl,
    limitFromUrl,
    setLimitFromUrl,
    ordering,
    setOrdering,
    data,
    isLoading,
    isRefetching,
    isFetchError,
    refetch,
    myNotesData,
  };
}

export function useMyNotesTable() {
  const errorT = useTranslations('errors');
  const navT = useTranslations('navigation');
  const notesT = useTranslations('myNotes');
  const commonT = useTranslations('common');
  const platform = usePlatform();
  const queryState = useMyNotesQueryState();
  const deleteNoteMutation = useDeleteMyNotes();
  const deleteIsLoading = deleteNoteMutation.isPending;

  const handleOrdering = (key: string) => {
    const { data, ordering, setOrdering } = queryState;
    if (
      data &&
      typeof data === 'object' &&
      'results' in data &&
      Array.isArray(data.results) &&
      data.results.length === 0
    ) {
      return;
    }
    const next = setOrdering(ordering === key ? '-' + String(key) : String(key));
    if (next?.catch) next.catch(() => {});
  };

  const handleNoteDelete = async (company_id: string) => {
    try {
      await deleteNoteMutation.mutateAsync({
        action: DELETE_ACTION,
        company_id: `-${company_id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    errorT,
    navT,
    notesT,
    commonT,
    platform,
    ...queryState,
    deleteIsLoading,
    handleOrdering,
    handleNoteDelete,
    getResponsiveHideClass,
  };
}
