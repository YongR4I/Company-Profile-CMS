# Setup Guide: Strapi CMS — Compro CMS

Connect **Compro-CMS** (Strapi 5) to **Compro-FE** (Next.js) so all content is editable from the Strapi admin panel.

---

## 1. Components (Shared Components)

Buat komponen-komponen berikut di Strapi untuk digunakan kembali di dalam berbagai tipe konten.

### Category: `links`

#### 1.1 `nav-link`

Digunakan untuk navigasi header dan footer.

| Field | Type | Notes |
|-------|------|-------|
| `label` | **Text** | Short text — e.g. "Home" |
| `href` | **Text** | Short text — e.g. "/about" |

#### 1.2 `social-link`

Digunakan untuk media sosial perusahaan.

| Field | Type | Notes |
|-------|------|-------|
| `platform` | **Enumeration** | Pilihan: `Facebook`, `Instagram`, `LinkedIn`, `TikTok`, `YouTube`, `WhatsApp`, `X_Twitter` |
| `url` | **Text** | Short text — e.g. "https://linkedin.com/company/samudrabiru" |

---

### Category: `elements`

#### 1.3 `why-choose-item`

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text — e.g. "Fast Delivery" |
| `description` | **Text** | Long text |

> Field `number` dihapus — urutan dihitung otomatis oleh Next.js berdasarkan urutan item di Strapi.

#### 1.4 `solution-item`

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text |
| `description` | **Text** | Long text |
| `icon` | **Media** | Single → Image (SVG recommended) |

> Media field mencegah editor salah mengetik nama icon.

#### 1.5 `process-step`

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text |
| `description` | **Text** | Long text |

> Field `number` dihapus — urutan diatur via drag-and-drop di Strapi.

#### 1.6 `feature-item`

Digunakan untuk list keunggulan dalam Service.

| Field | Type | Notes |
|-------|------|-------|
| `featureName` | **Text** | Short text — e.g. "SEO Optimization" |

#### 1.7 `partner-item`

| Field | Type | Notes |
|-------|------|-------|
| `name` | **Text** | Short text — e.g. "Google Cloud" (untuk alt-text / SEO) |
| `logo` | **Media** | Single → Image |
| `websiteUrl` | **Text** | Short text (optional) — e.g. "https://cloud.google.com" |

---

## 2. Collection Types (Dynamic & Relational)

### 2.1 Service

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text *(Required)* |
| `slug` | **UID** | Target: `title` *(Required)* |
| `description` | **Text** | Long text |
| `icon` | **Media** | Single → Image (SVG) *(Required)* |
| `features` | **Component** | `elements.feature-item` — **Repeatable** |

### 2.2 Category

Digunakan untuk kategori proyek portfolio.

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text — e.g. "E-Commerce" *(Required, Unique)* |
| `slug` | **UID** | Target: `title` *(Required)* |

### 2.3 Technology

Digunakan untuk tech-stack proyek portfolio.

| Field | Type | Notes |
|-------|------|-------|
| `name` | **Text** | Short text — e.g. "React Native" *(Required, Unique)* |
| `logo` | **Media** | Single → Image |

### 2.4 Tag

Digunakan untuk tag artikel blog.

| Field | Type | Notes |
|-------|------|-------|
| `name` | **Text** | Short text — e.g. "Next.js" *(Required, Unique)* |
| `slug` | **UID** | Target: `name` *(Required)* |

### 2.5 Author

| Field | Type | Notes |
|-------|------|-------|
| `name` | **Text** | Short text *(Required)* |
| `role` | **Text** | Short text — e.g. "Senior Frontend Developer" |
| `avatar` | **Media** | Single → Image |

### 2.6 Portfolio

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text *(Required)* |
| `slug` | **UID** | Target: `title` *(Required)* |
| `description` | **Text** | Long text |
| `image` | **Media** | Single → Image *(Required)* |
| `client` | **Text** | Short text (optional) |
| `date` | **Date** | Date picker *(Required)* — Next.js akan format (misal: "May 2026") |
| `category` | **Relation** | Many-to-One → `Category` *(Required)* |
| `technologies` | **Relation** | Many-to-Many → `Technology` |

### 2.7 Blog Post

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text *(Required)* |
| `slug` | **UID** | Target: `title` *(Required)* |
| `excerpt` | **Text** | Long text *(Required)* |
| `content` | **Rich text (Blocks)** | Full article body *(Required)* |
| `image` | **Media** | Single → Image *(Required)* |
| `date` | **Date** | Date picker *(Required)* |
| `author` | **Relation** | Many-to-One → `Author` *(Required)* |
| `tags` | **Relation** | Many-to-Many → `Tag` |

> Field `readTime` dihapus — dihitung otomatis oleh Next.js dari panjang `content`.

---

## 3. Single Types (Global & Pages)

### 3.1 Site Settings

| Field | Type | Notes |
|-------|------|-------|
| `siteName` | **Text** | Short text — e.g. "Sabiru" |
| `logo` | **Media** | Single → Image |
| `navLinks` | **Component** | `links.nav-link` — **Repeatable** |
| `socialLinks` | **Component** | `links.social-link` — **Repeatable** |
| `footerCompanyLinks` | **Component** | `links.nav-link` — **Repeatable** |
| `footerServiceLinks` | **Relation** | Many-to-Many → `Service` |
| `officeAddress` | **Text** | Long text |
| `workshopAddress` | **Text** | Long text |

### 3.2 Partners

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text — e.g. "Partners in Innovation" |
| `description` | **Text** | Long text |
| `partnerList` | **Component** | `elements.partner-item` — **Repeatable** |

### 3.3 CTA

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | Short text |
| `description` | **Text** | Long text |
| `buttonText` | **Text** | Short text — e.g. "Let's Talk" |
| `buttonHref` | **Text** | Short text — e.g. "/contact" |

### 3.4 Homepage

#### Opsi A: Dynamic Zone (Recommended)

| Field | Type | Notes |
|-------|------|-------|
| `pageBlocks` | **Dynamic Zone** | Components: `blocks.hero`, `blocks.about-headline`, `blocks.why-choose-us`, `blocks.solutions` |

**Block components to create:**

`blocks.hero`:

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | |
| `background` | **Media** | Single → Image |
| `ctaButtonText` | **Text** | Optional |
| `ctaButtonHref` | **Text** | Optional |

`blocks.about-headline`:

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | |
| `description` | **Text** | Long text |

`blocks.why-choose-us`:

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | |
| `items` | **Component** | `elements.why-choose-item` — **Repeatable** |

`blocks.solutions`:

| Field | Type | Notes |
|-------|------|-------|
| `title` | **Text** | |
| `items` | **Component** | `elements.solution-item` — **Repeatable** |

#### Opsi B: Clean Fields (Fixed Layout)

| Field | Type | Notes |
|-------|------|-------|
| `heroTitle` | **Text** | Short text |
| `heroBackground` | **Media** | Single → Image |
| `heroButtonText` | **Text** | Optional |
| `heroButtonHref` | **Text** | Optional |
| `aboutHeadlineTitle` | **Text** | Short text |
| `aboutHeadlineText` | **Text** | Long text |
| `whyChooseUsHeadline` | **Text** | Short text |
| `whyChooseItems` | **Component** | `elements.why-choose-item` — **Repeatable** |
| `solutions` | **Component** | `elements.solution-item` — **Repeatable** |

### 3.5 About Page

| Field | Type | Notes |
|-------|------|-------|
| `heroSubtitle` | **Text** | Short text |
| `missionLabel` | **Text** | Short text |
| `missionText` | **Text** | Long text |
| `processLabel` | **Text** | Short text |
| `processSteps` | **Component** | `elements.process-step` — **Repeatable** |

### 3.6 Services Page

| Field | Type | Notes |
|-------|------|-------|
| `heroSubtitle` | **Text** | Short text |

> Data service individual diambil dari koleksi `Service`.

### 3.7 Portfolio Page

| Field | Type | Notes |
|-------|------|-------|
| `heroTitle` | **Text** | Short text |

> Kategori diambil otomatis dari koleksi `Category`.

### 3.8 Blog Page

| Field | Type | Notes |
|-------|------|-------|
| `heroSubtitle` | **Text** | Short text |

> Data blog post diambil dari koleksi `Blog Post`.

### 3.9 Contact Page

| Field | Type | Notes |
|-------|------|-------|
| `heroSubtitle` | **Text** | Short text |

---

## 4. Configure API Access

### 4.1 Public read permissions

**Settings → Users & Permissions → Roles → Public** → enable `find` and `findOne` for all types. Save.

### 4.2 API Token

**Settings → API Tokens → Create**:
- Name: `Public Read`
- Type: `Read-only`

### 4.3 CORS

Edit `config/middlewares.ts`:

```ts
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    keepHeaderOnError: true,
  },
},
```

---

## 5. Connect Compro-FE

### 5.1 Create `Compro-FE/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=your-token-here
```

### 5.2 Update `src/lib/api.ts`

```ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const token = process.env.STRAPI_API_TOKEN;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});
```

### 5.3 Fetch examples

```ts
import { api } from '@/lib/api';

// Single type
const { data } = await api.get('/homepage?populate=deep');

// Collection (all)
const { data } = await api.get('/services?populate=deep');

// Collection (by slug)
const { data } = await api.get(`/blog-posts?filters[slug][$eq]=${slug}&populate=deep`);

// Nested populate (Portfolio with relations)
const { data } = await api.get('/portfolios?populate[category]=true&populate[technologies]=true');
```

---

## 6. API Endpoints

| Endpoint | Type |
|----------|------|
| `/api/site-settings?populate=deep` | Single |
| `/api/partners?populate=deep` | Single |
| `/api/cta?populate=deep` | Single |
| `/api/homepage?populate=deep` | Single |
| `/api/about-page?populate=deep` | Single |
| `/api/services-page?populate=deep` | Single |
| `/api/portfolio-page?populate=deep` | Single |
| `/api/blog-page?populate=deep` | Single |
| `/api/contact-page?populate=deep` | Single |
| `/api/services?populate=deep` | Collection |
| `/api/categories?populate=deep` | Collection |
| `/api/technologies?populate=deep` | Collection |
| `/api/tags?populate=deep` | Collection |
| `/api/authors?populate=deep` | Collection |
| `/api/portfolios?populate[category]=true&populate[technologies]=true` | Collection |
| `/api/blog-posts?populate[author]=true&populate[tags]=true&sort=date:desc` | Collection |

---

## 7. Commands

```bash
# Strapi
npm run develop    # dev with auto-reload
npm run build      # build admin panel
npm run start      # production

# Next.js
npm run dev        # localhost:3000
```
