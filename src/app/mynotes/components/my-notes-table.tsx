'use client';

import { Button } from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'investtech/external-components';
import Paginator from '@/components/custom-components/paginator';
import TableSkeleton from '@/components/custom-components/table-skeleton';
import { MyNote, MyNotesList } from '@/lib/types/my-notes';

import { MyNotesTableHeaderRow } from './my-notes-table-header';
import { NotesTableRow } from './notes-table-row';
import { useMyNotesTable } from './use-my-notes-table';

interface MyNotesErrorStateProps {
  navT: (key: string) => string;
  notesT: (key: string) => string;
  errorT: (key: string) => string;
  commonT: (key: string) => string;
  onRetry: () => void;
}

function MyNotesErrorState({ navT, notesT, errorT, commonT, onRetry }: MyNotesErrorStateProps) {
  return (
    <div>
      <div className="page-header-table flex flex-col justify-between md:flex-row md:items-center">
        <span id="page-title">{navT('myNotes')}</span>
        <span className="text-xs font-light">{notesT('myNotesDescription')}</span>
      </div>
      <Card className="mt-4">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-destructive mb-4 text-center">{errorT('failedToLoadNotes')}</p>
          <Button onClick={() => void onRetry()} variant="outline">
            {commonT('retry')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

interface MyNotesTableBodyProps {
  isLoading: boolean;
  isRefetching: boolean;
  deleteIsLoading: boolean;
  limitFromUrl: number;
  myNotesData: MyNotesList | undefined;
  errorT: (key: string) => string;
  platform: string;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  handleNoteDelete: (company_id: string) => Promise<void>;
  getResponsiveHideClass: (classes?: ('mobile' | 'tablet' | 'desktop' | 'laptop')[]) => string;
}

function MyNotesTableBody({
  isLoading,
  isRefetching,
  deleteIsLoading,
  limitFromUrl,
  myNotesData,
  errorT,
  platform,
  selectedNoteId,
  setSelectedNoteId,
  handleNoteDelete,
  getResponsiveHideClass,
}: MyNotesTableBodyProps) {
  if (isLoading || isRefetching || deleteIsLoading) {
    return <TableSkeleton rows={limitFromUrl} columns={4} />;
  }

  if (!myNotesData?.results?.length) {
    return (
      <TableBody>
        <TableRow showHover={false}>
          <TableCell colSpan={4} className="text-foreground py-4 text-center">
            {errorT('noData')}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {myNotesData.results.map((note: MyNote, index: number) => (
        <NotesTableRow
          key={note.company_id}
          note={note}
          index={index}
          platform={platform}
          selectedNoteId={selectedNoteId}
          deleteIsLoading={deleteIsLoading}
          onNoteSelect={setSelectedNoteId}
          onNoteDelete={(company_id) => void handleNoteDelete(company_id).catch(() => {})}
          getResponsiveHideClass={getResponsiveHideClass}
        />
      ))}
    </TableBody>
  );
}

interface NotesTableCardProps {
  notesT: (key: string) => string;
  ordering: string;
  handleOrdering: (key: string) => void;
  isLoading: boolean;
  isRefetching: boolean;
  deleteIsLoading: boolean;
  limitFromUrl: number;
  myNotesData: MyNotesList | undefined;
  errorT: (key: string) => string;
  platform: string;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  handleNoteDelete: (company_id: string) => Promise<void>;
  getResponsiveHideClass: (classes?: ('mobile' | 'tablet' | 'desktop' | 'laptop')[]) => string;
}

function NotesTableCard(props: NotesTableCardProps) {
  return (
    <div className="overflow-x-auto rounded-sm">
      <Card className="w-full">
        <CardContent>
          <Table className="w-full table-auto">
            <TableHeader>
              <MyNotesTableHeaderRow
                notesT={props.notesT}
                ordering={props.ordering}
                handleOrdering={props.handleOrdering}
              />
            </TableHeader>
            <MyNotesTableBody
              isLoading={props.isLoading}
              isRefetching={props.isRefetching}
              deleteIsLoading={props.deleteIsLoading}
              limitFromUrl={props.limitFromUrl}
              myNotesData={props.myNotesData}
              errorT={props.errorT}
              platform={props.platform}
              selectedNoteId={props.selectedNoteId}
              setSelectedNoteId={props.setSelectedNoteId}
              handleNoteDelete={props.handleNoteDelete}
              getResponsiveHideClass={props.getResponsiveHideClass}
            />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

interface MyNotesTableSuccessViewProps {
  navT: (key: string) => string;
  notesT: (key: string) => string;
  setPageFromUrl: (page: number) => Promise<unknown>;
  limitFromUrl: number;
  setLimitFromUrl: (limit: number) => Promise<unknown>;
  isLoading: boolean;
  myNotesData: MyNotesList | undefined;
  ordering: string;
  handleOrdering: (key: string) => void;
  handleNoteDelete: (company_id: string) => Promise<void>;
  getResponsiveHideClass: (classes?: ('mobile' | 'tablet' | 'desktop' | 'laptop')[]) => string;
  platform: string;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  isRefetching: boolean;
  deleteIsLoading: boolean;
  errorT: (key: string) => string;
}

function MyNotesTableSuccessView(props: MyNotesTableSuccessViewProps) {
  const showPaginator = props.myNotesData?.results && props.myNotesData.count > 5;
  return (
    <div>
      <div className="page-header-table flex flex-col justify-between md:flex-row md:items-center">
        <span id="page-title">{props.navT('myNotes')}</span>
        <span className="text-xs font-light">{props.notesT('myNotesDescription')}</span>
      </div>
      <NotesTableCard
        notesT={props.notesT}
        ordering={props.ordering}
        handleOrdering={props.handleOrdering}
        isLoading={props.isLoading}
        isRefetching={props.isRefetching}
        deleteIsLoading={props.deleteIsLoading}
        limitFromUrl={props.limitFromUrl}
        myNotesData={props.myNotesData}
        errorT={props.errorT}
        platform={props.platform}
        selectedNoteId={props.selectedNoteId}
        setSelectedNoteId={props.setSelectedNoteId}
        handleNoteDelete={props.handleNoteDelete}
        getResponsiveHideClass={props.getResponsiveHideClass}
      />
      {showPaginator && (
        <div className="flex w-full justify-end">
          <Paginator
            pageParent={(page: number) => void props.setPageFromUrl(page).catch(() => {})}
            pageSizeParent={(limit: number) => void props.setLimitFromUrl(limit).catch(() => {})}
            pageSize={props.limitFromUrl}
            isAPILoad={props.isLoading}
            countRow={props.myNotesData!.count}
          />
        </div>
      )}
    </div>
  );
}

export default function MyNotesTable() {
  const state = useMyNotesTable();

  if (state.isFetchError) {
    return (
      <MyNotesErrorState
        navT={state.navT}
        notesT={state.notesT}
        errorT={state.errorT}
        commonT={state.commonT}
        onRetry={() => void state.refetch().catch(() => {})}
      />
    );
  }

  return (
    <MyNotesTableSuccessView
      navT={state.navT}
      notesT={state.notesT}
      setPageFromUrl={state.setPageFromUrl}
      limitFromUrl={state.limitFromUrl}
      setLimitFromUrl={state.setLimitFromUrl}
      isLoading={state.isLoading}
      myNotesData={state.myNotesData}
      ordering={state.ordering}
      handleOrdering={state.handleOrdering}
      handleNoteDelete={state.handleNoteDelete}
      getResponsiveHideClass={state.getResponsiveHideClass}
      platform={state.platform}
      selectedNoteId={state.selectedNoteId}
      setSelectedNoteId={state.setSelectedNoteId}
      isRefetching={state.isRefetching}
      deleteIsLoading={state.deleteIsLoading}
      errorT={state.errorT}
    />
  );
}
