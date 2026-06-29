/**
 * ACF Flexible Content Block Types
 * These mirror exactly the field groups configured in WordPress ACF.
 * The `acf-to-rest-api` plugin exposes these on the `acf` key of each page/post.
 */

export interface ACFHeroBlock {
  enabled: boolean;
  badge_text?: string;
  headline: string;
  subheadline?: string;
  cta_text?: string;
  cta_url?: string;
  secondary_cta_text?: string;
  secondary_cta_url?: string;
}

export interface ACFStatItem {
  stat_number: string;
  stat_label: string;
  stat_description?: string;
}

export interface ACFStatsBlock {
  enabled: boolean;
  title?: string;
  description?: string;
  stat_1_number?: string;
  stat_1_label?: string;
  stat_1_description?: string;
  stat_2_number?: string;
  stat_2_label?: string;
  stat_2_description?: string;
  stat_3_number?: string;
  stat_3_label?: string;
  stat_3_description?: string;
  stat_4_number?: string;
  stat_4_label?: string;
  stat_4_description?: string;
}

export interface ACFTimelineBlock {
  enabled: boolean;
  badge_text?: string;
  title?: string;
  description?: string;
  step_1_title?: string;
  step_1_description?: string;
  step_2_title?: string;
  step_2_description?: string;
  step_3_title?: string;
  step_3_description?: string;
  step_4_title?: string;
  step_4_description?: string;
  step_5_title?: string;
  step_5_description?: string;
  step_6_title?: string;
  step_6_description?: string;
}

export interface ACFFeaturesBlock {
  enabled: boolean;
  badge_text?: string;
  title?: string;
  description?: string;
  feature_1_icon?: string;
  feature_1_title?: string;
  feature_1_text?: string;
  feature_2_icon?: string;
  feature_2_title?: string;
  feature_2_text?: string;
  feature_3_icon?: string;
  feature_3_title?: string;
  feature_3_text?: string;
  feature_4_icon?: string;
  feature_4_title?: string;
  feature_4_text?: string;
  feature_5_icon?: string;
  feature_5_title?: string;
  feature_5_text?: string;
  feature_6_icon?: string;
  feature_6_title?: string;
  feature_6_text?: string;
}

export interface ACFCtaBlock {
  enabled: boolean;
  /** 'dark' = primary-dark bg, 'green' = accent-green bg, 'light' = cream bg */
  variant?: 'dark' | 'green' | 'light';
  headline: string;
  description?: string;
  btn_text?: string;
  btn_url?: string;
  secondary_btn_text?: string;
  secondary_btn_url?: string;
}

export interface ACFFaqBlock {
  enabled: boolean;
  badge_text?: string;
  title?: string;
  description?: string;
  question_1?: string;
  answer_1?: string;
  question_2?: string;
  answer_2?: string;
  question_3?: string;
  answer_3?: string;
  question_4?: string;
  answer_4?: string;
  question_5?: string;
  answer_5?: string;
  question_6?: string;
  answer_6?: string;
  question_7?: string;
  answer_7?: string;
  question_8?: string;
  answer_8?: string;
}

export interface ACFRichTextBlock {
  enabled: boolean;
  content?: string;
}

/**
 * The top-level ACF Page Builder object attached to every page/post.
 * All blocks are optional — only enabled ones are rendered.
 */
export interface PageBuilderACF {
  hero_block?: ACFHeroBlock;
  stats_block?: ACFStatsBlock;
  timeline_block?: ACFTimelineBlock;
  features_block?: ACFFeaturesBlock;
  cta_block?: ACFCtaBlock;
  faq_block?: ACFFaqBlock;
  richtext_block?: ACFRichTextBlock;
}

/**
 * Helper: returns true if any block in the PageBuilder is enabled.
 * Used to decide whether to render blocks or fall back to content.rendered.
 */
export function hasEnabledBlocks(acf: PageBuilderACF | undefined | null): boolean {
  if (!acf) return false;
  return !!(
    acf.hero_block?.enabled ||
    acf.stats_block?.enabled ||
    acf.timeline_block?.enabled ||
    acf.features_block?.enabled ||
    acf.cta_block?.enabled ||
    acf.faq_block?.enabled ||
    acf.richtext_block?.enabled
  );
}

/**
 * Helper: returns true if there is at least one custom Lazy Block.
 * Used to decide whether to render Gutenberg blocks or fall back to standard text content.
 */
export function hasLazyBlocks(blocks: any[] | undefined | null): boolean {
  if (!blocks || !Array.isArray(blocks)) return false;
  return blocks.some(b => b.blockName && b.blockName.startsWith('lazyblock/'));
}
