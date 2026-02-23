export type ResearchPage = {
  type: string;
  intra_page_menu: IntraPageMenuItem[];
  related_posts: RelatedPost[];
  sections: ResearchPageSection[];
  meta: Metadata;
  publication: Publication;
};

export type Metadata = {
  title: string;
  description: string;
};

export type IntraPageMenuItem = {
  name: string;
  link: string;
};

export type Publication = {
  published_date: string;
  published_time: string;
  author_initials: string;
  author_name: string;
  author_title: string;
  author_email: string;
  author_image: AuthorImage;
};

export type AuthorImage = {
  type: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
};

export type RelatedPost = {
  id: string;
  post_title: string;
  post_name: string;
};

export type ResearchPageSection = {
  published_date: string;
  title: string;
  wordpress_post_id: string;
  id: number;
  blocks: ResearchPageBlock[];
};

export type ImageWidth = 'xs' | 'sm' | 'md' | 'lg' | 'full';

export type ColumnDataType = 'string' | 'integer' | 'percent' | 'percentChange(pp)';

export interface TableDefinitionColumn {
  column_name: string;
  key: string;
  align?: 'left' | 'center' | 'right';
  colspan?: number;
}

export interface TableBlock {
  type: 'table';
  attributes?: Record<string, unknown>;
  rows?: TableRowData[];
  table_definition?: TableDefinitionColumn[];
  data?: Record<string, string>[];
}

export type TableCellData =
  | string
  | {
      content: string;
      attributes?: Record<string, unknown>;
    };

export type TableRowData = TableCellData[];

export type ResearchPageBlock = {
  type: string;
  collapsed?: boolean;
  text?: string;
  subs?: { type: string; text: string; link?: string; link_title?: string }[];
  items?: string[];
  ordered?: boolean;
  columns?: TableColumns;
  data?: string[][];
  chart_param?: string;
  img_title?: string;
  img_src?: string;
  img_width?: ImageWidth;
  img_explanation?: string;
  src?: string;
  href?: string;
  attributes?: Record<string, unknown>;
  class?: string;
  children?: ResearchPageBlock[];
  alt?: string;
  title?: string;
  chart_maximize?: boolean;
  chart_tooltip_id?: number;
  width?: number;
  height?: number;
  image_caption?: string;
  colspan?: number;
  caption?: string;
  text_color?: string;
  background_color?: string;
  align?: string;
  listCaption?: string;
  metric?: { label: string; value: string };
  rows?: TableRowData[];
  links?: { text: string; url: string }[];
  svg?: string;
  blocks?: ResearchPageBlock[];
  table_type?: string;
  table_definition?: TableDefinitionColumn[];
  content?: ResearchPageBlock;
  summary?: string;
  arrow_image?: { src: string; width: number; height: number };
  arrow_text?: string;
  table?: { data: TableRowData[] };
  sign: number;
  image_dynamic?: FlexibleImageBlock;
  image: FlexibleImageBlock;
  related_stocks_title?: string;
  related_stocks_text?: string;
  related_stocks?: RelatedStock[];
  read_more: ReadMoreBlock;
};

export type ReadMoreBlock = {
  anchor_text: string;
  href: string;
  label: string;
};

export type RelatedStock = {
  company_id: string;
  company_name: string;
  ticker: string;
};

export type TableColumns = {
  column_headers: string[];
  column_data_type: ColumnDataType[];
};

export interface Action {
  type: 'button';
  label: string;
  onClick?: {
    signalKey: string;
    title: string;
    includeRelatedStocksSection: boolean;
  };
}

export interface FlexibleImageBlock {
  type: string;
  src: string;
  alt: string;
  title: string;
  width?: number;
  height?: number;
  caption?: string;
  chart_param?: string;
}

export interface FlexibleHorizontalImageGroupsBlock {
  type: string;
  blocks: FlexibleImageBlock[];
}

export interface FlexibleHorizontalImageTextGroupsBlock {
  type: string;
  blocks: (FlexibleImageBlock | ResearchPageBlock)[];
}

/* export type ParagraphBlock = {
  type: 'paragraph';
  text: string;
};

export type H2Block = {
  type: 'h2';
  text: string;
};

export type H3Block = {
  type: 'h3';
  text: string;
};

export type ListBlock = {
  type: 'list';
  items: string[];
};

export type StandardTableBlock = {
  type: 'standardTable';
  columns: TableColumns;
  data: string[][];
};

export type ResearchTableBlock = {
  type: 'researchTable';
  columns: TableColumns;
  data: string[][];
};

export type ChartImageBlock = {
  type: 'image';
  chart_param: string;
  width: ImageWidth;
  image_caption: string;
};

export type AssetImageBlock = {
  type: 'image';
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  caption: string;
};

export type ImageWithTextBlock = {
  type: 'image_with_text';
  img_title: string;
  img_src: string;
  img_width: ImageWidth;
  img_explanation: string;
}; */

/* export type ResearchPageBlock =
  | ParagraphBlock
  | H2Block
  | H3Block
  | ListBlock
  | StandardTableBlock
  | ResearchTableBlock
  | ChartImageBlock
  | AssetImageBlock
  | ImageWithTextBlock; */
