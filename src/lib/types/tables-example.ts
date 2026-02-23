export type TableCellValue =
  | string
  | number
  | LabelValueColored
  | TextValueColored
  | Record<string, unknown>;

export type TableRow = Record<string, TableCellValue>;
export type TableData = Record<string, TableRow>;

export type TableHeaders = Record<string, string>;
export type TableDataType = Record<string, string>;
export type TableClass = Record<string, string>;
export type TableAlign = Record<string, 'left' | 'right' | 'center' | 'justify' | string>;
export type TableHidden = Record<string, string>;
export type TableStyleTrigger = Record<string, string>;

export type TableParams = {
  data: TableData;
  column_headers?: TableHeaders;
  column_data_type?: TableDataType;
  row_data_type?: TableDataType;
  column_class?: TableClass;
  row_class?: TableClass;
  column_align?: TableAlign;
  column_hidden?: TableHidden;
  column_style_trigger?: TableStyleTrigger;
  caption?: string;
  width?: string;
  text_size?: string;
  table_header?: string;
  hover_class?: string;
  backend_converted_from_type?: Record<string, string>;
};

export type TableEntry = {
  component_name: string;
  params: TableParams;
};

export type TableGuide = {
  component_name?: string;
  usage?: string;
  best_practice?: string;
  example_highlights?: string;
  example_description?: string;
  section_label?: string;
  front_developer_notes?: string;
};

export type TableExampleGroup = {
  table?: TableEntry;
  guide?: TableGuide | string[];
};

export type TableExamples = Record<string, Record<string, TableExampleGroup>>;

export type DataTypeOverview = {
  component_name: string;
  params: TableParams;
};

export type DataTypeSingleExample = {
  component_name: string;
  data_type_example_name: string;
  params: TableParams;
};

export type DataTypeSection = {
  overview: DataTypeOverview;
  guide: TableGuide;
  single_type_examples: Record<string, DataTypeSingleExample>;
};

export type DataTypeExamples = Record<string, DataTypeSection>;

export type ApiGuide = {
  api_name: string;
  version: string;
  description: string;
  filtering: string;
  search_text_info: string;
  examples: string[];
  version_history?: string[];
};

export type MetaInfo = {
  title: string;
  description: string;
};

export type TableExamplesResponse = {
  api_guide: ApiGuide;
  tables_component_guide?: string[];
  table_examples: TableExamples;
  data_type_examples: DataTypeExamples & { available_data_type_sections?: string[] };
  meta: MetaInfo;
};

export type LabelValueColored = {
  c_name: 'labelValueColored';
  value: number;
  text: string;
  size: 'small' | 'medium' | 'big' | string;
  color: 'positive' | 'neutral' | 'negative' | string;
};

export type TextValueColored = {
  c_name: 'textValueColored';
  value: number;
  text: string;
  color: 'positive' | 'neutral' | 'negative' | string;
};
