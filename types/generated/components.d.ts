import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAboutHeadline extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about_headlines';
  info: {
    displayName: 'about-headline';
    icon: 'quote';
  };
  attributes: {
    description: Schema.Attribute.Text;
    headline: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'hero';
    icon: 'picture';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    ctaButtonHref: Schema.Attribute.String;
    ctaButtonText: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSolutions extends Struct.ComponentSchema {
  collectionName: 'components_blocks_solutions';
  info: {
    displayName: 'solutions';
    icon: 'apps';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.solution-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksWhyChooseUs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_why_choose_uses';
  info: {
    displayName: 'why-choose-us';
    icon: 'check-square';
  };
  attributes: {
    headline: Schema.Attribute.String;
    items: Schema.Attribute.Component<'elements.why-choose-item', true>;
  };
}

export interface ElementsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_feature_items';
  info: {
    displayName: 'feature-item';
    icon: 'star';
  };
  attributes: {
    featureName: Schema.Attribute.String;
  };
}

export interface ElementsPartnerItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_partner_items';
  info: {
    displayName: 'partner-item';
    icon: 'handshake';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    websiteUrl: Schema.Attribute.String;
  };
}

export interface ElementsProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_process_steps';
  info: {
    displayName: 'process-step';
    icon: 'arrow-right';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ElementsSolutionItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_solution_items';
  info: {
    displayName: 'solution-item';
    icon: 'lightbulb';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsWhyChooseItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_why_choose_items';
  info: {
    displayName: 'why-choose-item';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface LinksNavLink extends Struct.ComponentSchema {
  collectionName: 'components_links_nav_links';
  info: {
    displayName: 'nav-link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface LinksSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'social-link';
    icon: 'twitter';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      [
        'Facebook',
        'Instagram',
        'LinkedIn',
        'TikTok',
        'YouTube',
        'WhatsApp',
        'X_Twitter',
      ]
    >;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blocks.about-headline': BlocksAboutHeadline;
      'blocks.hero': BlocksHero;
      'blocks.solutions': BlocksSolutions;
      'blocks.why-choose-us': BlocksWhyChooseUs;
      'elements.feature-item': ElementsFeatureItem;
      'elements.partner-item': ElementsPartnerItem;
      'elements.process-step': ElementsProcessStep;
      'elements.solution-item': ElementsSolutionItem;
      'elements.why-choose-item': ElementsWhyChooseItem;
      'links.nav-link': LinksNavLink;
      'links.social-link': LinksSocialLink;
    }
  }
}
