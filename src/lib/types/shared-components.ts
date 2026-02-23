export type AuthorImage = {
  type: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
};

export type Price = {
  close: string;
  profit_loss_percent?: ProfitLossPercent;
  price_date: string;
  price_date_long: string;
};

export type ProfitLossPercent = {
  sign: number;
  value: string;
  is_badge: boolean;
};
export type StaticInfo = {
  about_header_text: string;
  description: string;
  description_suggested_clip_length: number;
  company_url: string;
  source: string;
};

export type Sectors = {
  sector: SectorGroup;
  group: SectorGroup;
  industry: SectorGroup;
};

export type SectorGroup = {
  id: string;
  name: string;
  link?: string;
};

export type Recommendation = {
  type: string;
  free_version: number;
  investtech?: RecommendationInvesttech;
  analyst?: Analyst;
};

export type RecommendationInvesttech = {
  score: string;
  eval_code: number;
  eval_text: string;
  color: string;
  color_tailwind: string;
};

export type Analyst = {
  eval_code: number;
  eval_text: string;
  color: string;
  color_tailwind: string;
};

export type Risk = {
  calculated: boolean;
  liquidity: RiskLevel;
  volatility: RiskLevel;
  total: TotalRisk;
};

export type RiskLevel = {
  text: string;
  level: string;
  score: number;
};

export type TotalRisk = {
  icon: boolean;
  text_long: string;
  text_short: string;
  level: string;
  score: string | number;
  color: string;
};

export type LabelsAndTexts = {
  sub_title?: string;
  close: string;
  updated: string;
  about_company: string;
  website: string;
  source: string;
  sector: string;
  watchlist_action?: string;
  my_notes_action?: string;
  recommendation: string;
  risk?: string;
  liquidity_risk?: string;
  volatility_risk?: string;
  recommendation_card_help: string[] | string;
  watchlist_action_add?: string;
  watchlist_response_add?: string;
  watchlist_action_remove?: string;
  watchlist_response_remove?: string;
  my_notes_place_holder?: string;
  ses_language?: string;
  module_title?: string;
  read_more?: string;
  extra_info?: string;
  see_more?: string;
  see_more_info?: string;
};

export type FactorDiagram = {
  active: boolean;
  svg: string;
  tooltips: FactorDiagramTooltips;
  svg_with_tooltips_just_for_reference: string;
  frontend_guide: FactorDiagramFrontendGuide;
  is_dummy: boolean;
  labels: FactorDiagramLabelsAndTexts;
  meta: FactorDiagramMeta;
};

export type FactorDiagramMeta = {
  variant_id: number;
  xy_size?: number;
  ok_to_print_factor_diagram?: number;
  inside_exist?: number;
  kpi_set?: number;
  eer_set?: number;
  available?: boolean;
  free_version?: number;
  width?: number;
  height?: number;
};

export type FactorDiagramTooltips = {
  slice1: FactorTooltip;
  slice2: FactorTooltip;
  slice3: FactorTooltip;
  slice4: FactorTooltip;
  slice5: FactorTooltip;
};

export type FactorTooltip = {
  title: string;
  status: string;
  score: string;
  description: string;
  elements: TooltipElement[];
};

export type TooltipElement = {
  name: string;
  value: string;
  score: string;
};

export type FactorDiagramLabelsAndTexts = {
  context: string;
  title: string;
  explanation: string;
  cterm_element: string;
  cterm_value: string;
  cterm_score: string;
  cterm_see_more: string;
  help_source: string;
};

export type FactorDiagramFrontendGuide = {
  overview: string;
  structure: GuideStructure;
  factors: GuideFactors;
  implementation: GuideImplementation;
  examples?: GuideExamples;
  tooltip_structure?: GuideTooltipStructure;
  css_classes?: GuideCssClasses;
  data_notes?: GuideDataNotes;
};

export type GuideStructure = {
  svg: string;
  svg_with_tooltips: string;
  tooltips: string;
};

export type GuideFactors = {
  teknisk: string;
  kvantitativt: string;
  innside: string;
  stabilitet: string;
  fundamentalt: string;
};

export type GuideImplementation = {
  hover: string;
  mobile: string;
  positioning: string;
  styling: string;
};

export type GuideExamples = {
  react: Example;
  vanilla: Example;
};
export type Example = {
  description: string;
  code: string;
};

export type GuideTooltipStructure = {
  title: string;
  status: string;
  score: string;
  description: string;
  elements: string;
};

export type GuideCssClasses = {
  factorTooltip: string;
  factorTooltipTable: string;
  hidden: string;
};
export type GuideDataNotes = {
  weighted_average: string;
  availability: string;
  calculation: string;
};
