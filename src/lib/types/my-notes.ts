export type MyNotesList = {
  count: number;
  results: MyNote[];
};

export type MyNote = {
  company_id: string;
  name: string;
  ticker: string;
  market_id: string;
  note: string;
  date: string;
  redirect_url: string;
};

export type NoteAction = {
  success: boolean;
};
