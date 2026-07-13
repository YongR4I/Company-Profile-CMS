const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

const components = [
  {
    category: 'links',
    name: 'nav-link',
    schema: {
      collectionName: 'components_links_nav_links',
      info: { displayName: 'nav-link', icon: 'link' },
      options: {},
      attributes: {
        label: { type: 'string' },
        href: { type: 'string' }
      }
    }
  },
  {
    category: 'links',
    name: 'social-link',
    schema: {
      collectionName: 'components_links_social_links',
      info: { displayName: 'social-link', icon: 'twitter' },
      options: {},
      attributes: {
        platform: { type: 'enumeration', enum: ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube', 'WhatsApp', 'X_Twitter'] },
        url: { type: 'string' }
      }
    }
  },
  {
    category: 'elements',
    name: 'why-choose-item',
    schema: {
      collectionName: 'components_elements_why_choose_items',
      info: { displayName: 'why-choose-item', icon: 'check' },
      options: {},
      attributes: {
        title: { type: 'string' },
        description: { type: 'text' }
      }
    }
  },
  {
    category: 'elements',
    name: 'solution-item',
    schema: {
      collectionName: 'components_elements_solution_items',
      info: { displayName: 'solution-item', icon: 'lightbulb' },
      options: {},
      attributes: {
        title: { type: 'string' },
        description: { type: 'text' },
        icon: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] }
      }
    }
  },
  {
    category: 'elements',
    name: 'process-step',
    schema: {
      collectionName: 'components_elements_process_steps',
      info: { displayName: 'process-step', icon: 'arrow-right' },
      options: {},
      attributes: {
        title: { type: 'string' },
        description: { type: 'text' }
      }
    }
  },
  {
    category: 'elements',
    name: 'feature-item',
    schema: {
      collectionName: 'components_elements_feature_items',
      info: { displayName: 'feature-item', icon: 'star' },
      options: {},
      attributes: {
        featureName: { type: 'string' }
      }
    }
  },
  {
    category: 'elements',
    name: 'partner-item',
    schema: {
      collectionName: 'components_elements_partner_items',
      info: { displayName: 'partner-item', icon: 'handshake' },
      options: {},
      attributes: {
        name: { type: 'string' },
        logo: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
        websiteUrl: { type: 'string' }
      }
    }
  },
  // Blocks for Dynamic Zone
  {
    category: 'blocks',
    name: 'hero',
    schema: {
      collectionName: 'components_blocks_heroes',
      info: { displayName: 'hero', icon: 'picture' },
      options: {},
      attributes: {
        title: { type: 'string' },
        background: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
        ctaButtonText: { type: 'string' },
        ctaButtonHref: { type: 'string' }
      }
    }
  },
  {
    category: 'blocks',
    name: 'about-headline',
    schema: {
      collectionName: 'components_blocks_about_headlines',
      info: { displayName: 'about-headline', icon: 'quote' },
      options: {},
      attributes: {
        title: { type: 'string' },
        description: { type: 'text' }
      }
    }
  },
  {
    category: 'blocks',
    name: 'why-choose-us',
    schema: {
      collectionName: 'components_blocks_why_choose_uses',
      info: { displayName: 'why-choose-us', icon: 'check-square' },
      options: {},
      attributes: {
        title: { type: 'string' },
        items: { type: 'component', repeatable: true, component: 'elements.why-choose-item' }
      }
    }
  },
  {
    category: 'blocks',
    name: 'solutions',
    schema: {
      collectionName: 'components_blocks_solutions',
      info: { displayName: 'solutions', icon: 'apps' },
      options: {},
      attributes: {
        title: { type: 'string' },
        items: { type: 'component', repeatable: true, component: 'elements.solution-item' }
      }
    }
  }
];

const apiTypes = [
  {
    name: 'service',
    type: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'services',
      info: { singularName: 'service', pluralName: 'services', displayName: 'Service', description: '' },
      options: { draftAndPublish: true },
      pluginOptions: {},
      attributes: {
        title: { type: 'string', required: true },
        slug: { type: 'uid', targetField: 'title', required: true },
        description: { type: 'text' },
        icon: { type: 'media', multiple: false, required: true, allowedTypes: ['images'] },
        features: { type: 'component', repeatable: true, component: 'elements.feature-item' }
      }
    }
  },
  {
    name: 'category',
    type: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'categories',
      info: { singularName: 'category', pluralName: 'categories', displayName: 'Category' },
      options: { draftAndPublish: false },
      attributes: {
        title: { type: 'string', required: true, unique: true },
        slug: { type: 'uid', targetField: 'title', required: true }
      }
    }
  },
  {
    name: 'technology',
    type: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'technologies',
      info: { singularName: 'technology', pluralName: 'technologies', displayName: 'Technology' },
      options: { draftAndPublish: false },
      attributes: {
        name: { type: 'string', required: true, unique: true },
        logo: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] }
      }
    }
  },
  {
    name: 'tag',
    type: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'tags',
      info: { singularName: 'tag', pluralName: 'tags', displayName: 'Tag' },
      options: { draftAndPublish: false },
      attributes: {
        name: { type: 'string', required: true, unique: true },
        slug: { type: 'uid', targetField: 'name', required: true }
      }
    }
  },
  {
    name: 'author',
    type: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'authors',
      info: { singularName: 'author', pluralName: 'authors', displayName: 'Author' },
      options: { draftAndPublish: false },
      attributes: {
        name: { type: 'string', required: true },
        role: { type: 'string' },
        avatar: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] }
      }
    }
  },
  {
    name: 'portfolio',
    type: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'portfolios',
      info: { singularName: 'portfolio', pluralName: 'portfolios', displayName: 'Portfolio' },
      options: { draftAndPublish: true },
      attributes: {
        title: { type: 'string', required: true },
        slug: { type: 'uid', targetField: 'title', required: true },
        description: { type: 'text' },
        image: { type: 'media', multiple: false, required: true, allowedTypes: ['images'] },
        client: { type: 'string' },
        date: { type: 'date', required: true },
        category: { type: 'relation', relation: 'manyToOne', target: 'api::category.category', inversedBy: 'portfolios' },
        technologies: { type: 'relation', relation: 'manyToMany', target: 'api::technology.technology', inversedBy: 'portfolios' }
      }
    }
  },
  {
    name: 'blog-post',
    type: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'blog_posts',
      info: { singularName: 'blog-post', pluralName: 'blog-posts', displayName: 'Blog Post' },
      options: { draftAndPublish: true },
      attributes: {
        title: { type: 'string', required: true },
        slug: { type: 'uid', targetField: 'title', required: true },
        excerpt: { type: 'text', required: true },
        content: { type: 'richtext', required: true },
        image: { type: 'media', multiple: false, required: true, allowedTypes: ['images'] },
        date: { type: 'date', required: true },
        author: { type: 'relation', relation: 'manyToOne', target: 'api::author.author', inversedBy: 'blog_posts' },
        tags: { type: 'relation', relation: 'manyToMany', target: 'api::tag.tag', inversedBy: 'blog_posts' }
      }
    }
  },
  {
    name: 'site-setting',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'site_settings',
      info: { singularName: 'site-setting', pluralName: 'site-settings', displayName: 'Site Settings' },
      options: { draftAndPublish: false },
      attributes: {
        siteName: { type: 'string' },
        logo: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] },
        navLinks: { type: 'component', repeatable: true, component: 'links.nav-link' },
        socialLinks: { type: 'component', repeatable: true, component: 'links.social-link' },
        footerCompanyLinks: { type: 'component', repeatable: true, component: 'links.nav-link' },
        footerServiceLinks: { type: 'relation', relation: 'oneToMany', target: 'api::service.service' },
        officeAddress: { type: 'text' },
        workshopAddress: { type: 'text' }
      }
    }
  },
  {
    name: 'partner',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'partners',
      info: { singularName: 'partner', pluralName: 'partners', displayName: 'Partners' },
      options: { draftAndPublish: true },
      attributes: {
        title: { type: 'string' },
        description: { type: 'text' },
        partnerList: { type: 'component', repeatable: true, component: 'elements.partner-item' }
      }
    }
  },
  {
    name: 'cta',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'ctas',
      info: { singularName: 'cta', pluralName: 'ctas', displayName: 'CTA' },
      options: { draftAndPublish: true },
      attributes: {
        title: { type: 'string' },
        description: { type: 'text' },
        buttonText: { type: 'string' },
        buttonHref: { type: 'string' }
      }
    }
  },
  {
    name: 'homepage',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'homepages',
      info: { singularName: 'homepage', pluralName: 'homepages', displayName: 'Homepage' },
      options: { draftAndPublish: true },
      attributes: {
        pageBlocks: { type: 'dynamiczone', components: ['blocks.hero', 'blocks.about-headline', 'blocks.why-choose-us', 'blocks.solutions'] }
      }
    }
  },
  {
    name: 'about-page',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'about_pages',
      info: { singularName: 'about-page', pluralName: 'about-pages', displayName: 'About Page' },
      options: { draftAndPublish: true },
      attributes: {
        heroSubtitle: { type: 'string' },
        missionLabel: { type: 'string' },
        missionText: { type: 'text' },
        processLabel: { type: 'string' },
        processSteps: { type: 'component', repeatable: true, component: 'elements.process-step' }
      }
    }
  },
  {
    name: 'services-page',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'services_pages',
      info: { singularName: 'services-page', pluralName: 'services-pages', displayName: 'Services Page' },
      options: { draftAndPublish: true },
      attributes: {
        heroSubtitle: { type: 'string' }
      }
    }
  },
  {
    name: 'portfolio-page',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'portfolio_pages',
      info: { singularName: 'portfolio-page', pluralName: 'portfolio-pages', displayName: 'Portfolio Page' },
      options: { draftAndPublish: true },
      attributes: {
        heroTitle: { type: 'string' }
      }
    }
  },
  {
    name: 'blog-page',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'blog_pages',
      info: { singularName: 'blog-page', pluralName: 'blog-pages', displayName: 'Blog Page' },
      options: { draftAndPublish: true },
      attributes: {
        heroSubtitle: { type: 'string' }
      }
    }
  },
  {
    name: 'contact-page',
    type: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'contact_pages',
      info: { singularName: 'contact-page', pluralName: 'contact-pages', displayName: 'Contact Page' },
      options: { draftAndPublish: true },
      attributes: {
        heroSubtitle: { type: 'string' }
      }
    }
  }
];

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Created: ${filePath}`);
}

components.forEach(comp => {
  const filePath = path.join(baseDir, 'components', comp.category, `${comp.name}.json`);
  writeJson(filePath, comp.schema);
});

apiTypes.forEach(api => {
  const schemaPath = path.join(baseDir, 'api', api.name, 'content-types', api.name, 'schema.json');
  writeJson(schemaPath, api.schema);

  // Also need to create basic controllers/routes/services for each API type
  const routesPath = path.join(baseDir, 'api', api.name, 'routes', `${api.name}.ts`);
  const controllersPath = path.join(baseDir, 'api', api.name, 'controllers', `${api.name}.ts`);
  const servicesPath = path.join(baseDir, 'api', api.name, 'services', `${api.name}.ts`);

  const tsContentRouter = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreRouter('api::${api.name}.${api.name}');\n`;
  const tsContentController = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreController('api::${api.name}.${api.name}');\n`;
  const tsContentService = `import { factories } from '@strapi/strapi';\n\nexport default factories.createCoreService('api::${api.name}.${api.name}');\n`;

  fs.mkdirSync(path.dirname(routesPath), { recursive: true });
  fs.writeFileSync(routesPath, tsContentRouter);
  fs.mkdirSync(path.dirname(controllersPath), { recursive: true });
  fs.writeFileSync(controllersPath, tsContentController);
  fs.mkdirSync(path.dirname(servicesPath), { recursive: true });
  fs.writeFileSync(servicesPath, tsContentService);
});

console.log('Strapi Schemas and standard API files generated successfully!');
