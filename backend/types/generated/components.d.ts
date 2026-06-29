import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    description: '';
    displayName: 'CTA Block';
    icon: 'button';
  };
  attributes: {
    btn_text: Schema.Attribute.String;
    btn_url: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    secondary_btn_text: Schema.Attribute.String;
    secondary_btn_url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['dark', 'green', 'light']> &
      Schema.Attribute.DefaultTo<'dark'>;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    description: '';
    displayName: 'FAQ Block';
    icon: 'question';
  };
  attributes: {
    answer_1: Schema.Attribute.Text;
    answer_2: Schema.Attribute.Text;
    answer_3: Schema.Attribute.Text;
    answer_4: Schema.Attribute.Text;
    answer_5: Schema.Attribute.Text;
    answer_6: Schema.Attribute.Text;
    answer_7: Schema.Attribute.Text;
    answer_8: Schema.Attribute.Text;
    badge_text: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    question_1: Schema.Attribute.String;
    question_2: Schema.Attribute.String;
    question_3: Schema.Attribute.String;
    question_4: Schema.Attribute.String;
    question_5: Schema.Attribute.String;
    question_6: Schema.Attribute.String;
    question_7: Schema.Attribute.String;
    question_8: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFeatures extends Struct.ComponentSchema {
  collectionName: 'components_blocks_features';
  info: {
    description: '';
    displayName: 'Features Grid';
    icon: 'grid';
  };
  attributes: {
    badge_text: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    feature_1_icon: Schema.Attribute.String;
    feature_1_text: Schema.Attribute.Text;
    feature_1_title: Schema.Attribute.String;
    feature_2_icon: Schema.Attribute.String;
    feature_2_text: Schema.Attribute.Text;
    feature_2_title: Schema.Attribute.String;
    feature_3_icon: Schema.Attribute.String;
    feature_3_text: Schema.Attribute.Text;
    feature_3_title: Schema.Attribute.String;
    feature_4_icon: Schema.Attribute.String;
    feature_4_text: Schema.Attribute.Text;
    feature_4_title: Schema.Attribute.String;
    feature_5_icon: Schema.Attribute.String;
    feature_5_text: Schema.Attribute.Text;
    feature_5_title: Schema.Attribute.String;
    feature_6_icon: Schema.Attribute.String;
    feature_6_text: Schema.Attribute.Text;
    feature_6_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'layout';
  };
  attributes: {
    badge_text: Schema.Attribute.String;
    cta_text: Schema.Attribute.String;
    cta_url: Schema.Attribute.String;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    secondary_cta_text: Schema.Attribute.String;
    secondary_cta_url: Schema.Attribute.String;
    subheadline: Schema.Attribute.String;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    description: '';
    displayName: 'Rich Text Block';
    icon: 'align-left';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface BlocksStats extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats';
  info: {
    description: '';
    displayName: 'Stats Block';
    icon: 'chart-bar';
  };
  attributes: {
    description: Schema.Attribute.Text;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    stat_1_description: Schema.Attribute.String;
    stat_1_label: Schema.Attribute.String;
    stat_1_number: Schema.Attribute.String;
    stat_2_description: Schema.Attribute.String;
    stat_2_label: Schema.Attribute.String;
    stat_2_number: Schema.Attribute.String;
    stat_3_description: Schema.Attribute.String;
    stat_3_label: Schema.Attribute.String;
    stat_3_number: Schema.Attribute.String;
    stat_4_description: Schema.Attribute.String;
    stat_4_label: Schema.Attribute.String;
    stat_4_number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTimeline extends Struct.ComponentSchema {
  collectionName: 'components_blocks_timelines';
  info: {
    description: '';
    displayName: 'Timeline Block';
    icon: 'clock';
  };
  attributes: {
    badge_text: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    step_1_description: Schema.Attribute.Text;
    step_1_title: Schema.Attribute.String;
    step_2_description: Schema.Attribute.Text;
    step_2_title: Schema.Attribute.String;
    step_3_description: Schema.Attribute.Text;
    step_3_title: Schema.Attribute.String;
    step_4_description: Schema.Attribute.Text;
    step_4_title: Schema.Attribute.String;
    step_5_description: Schema.Attribute.Text;
    step_5_title: Schema.Attribute.String;
    step_6_description: Schema.Attribute.Text;
    step_6_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.cta': BlocksCta;
      'blocks.faq': BlocksFaq;
      'blocks.features': BlocksFeatures;
      'blocks.hero': BlocksHero;
      'blocks.rich-text': BlocksRichText;
      'blocks.stats': BlocksStats;
      'blocks.timeline': BlocksTimeline;
    }
  }
}
