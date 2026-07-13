# Compro CMS

Strapi 5 CMS for company profile website.

## Prerequisites

- **Node.js** >=20.x
- **npm** >=6.x
- **PostgreSQL** 14+ (or SQLite for local dev)

## Quick Start

```bash
# 1. Clone
git clone https://github.com/YongR4I/Company-Profile-CMS.git
cd Company-Profile-CMS

# 2. Install
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env — at minimum set DATABASE_PASSWORD and all secrets

# 4. Run
npm run develop
```

Open `http://localhost:1337/admin` and create your admin account.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HOST` | Server bind address | `0.0.0.0` |
| `PORT` | Server port | `1337` |
| `APP_KEYS` | 4 comma-separated session keys | — |
| `API_TOKEN_SALT` | Salt for API tokens | — |
| `ADMIN_JWT_SECRET` | JWT secret for admin | — |
| `JWT_SECRET` | JWT secret for users | — |
| `TRANSFER_TOKEN_SALT` | Salt for transfer tokens | — |
| `ENCRYPTION_KEY` | Encryption key for secrets | — |
| `DATABASE_CLIENT` | Database engine | `postgres` |
| `DATABASE_HOST` | Database host | `127.0.0.1` |
| `DATABASE_PORT` | Database port | `5432` |
| `DATABASE_NAME` | Database name | `Compro-PKL` |
| `DATABASE_USERNAME` | Database user | `postgres` |
| `DATABASE_PASSWORD` | Database password | — |
| `DATABASE_SSL` | Enable SSL connection | `false` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

### Generate Secrets

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run 6 times for: `APP_KEYS` (need 4 comma-separated), `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`.

## Database Setup (PostgreSQL)

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE "Compro-PKL";

# Verify
\l
\q
```

For SQLite (local dev only), set `DATABASE_CLIENT=sqlite` in `.env`.

## After Running

### 1. Create Admin Account
Visit `http://localhost:1337/admin` and register.

### 2. Set Public Permissions
**Settings → Users & Permissions → Roles → Public** — enable `find` and `findOne` for all content types. Save.

### 3. Create API Token (Optional)
**Settings → API Tokens → Create** — name: `Public Read`, type: `Read-only`.

## Connecting Frontend

```env
# In your Next.js .env.local:
NEXT_PUBLIC_API_URL=http://localhost:1337/api
STRAPI_API_TOKEN=your-read-only-token
```

### API Endpoints

| Endpoint | Type |
|----------|------|
| `/api/site-settings?populate=deep` | Single |
| `/api/homepage?populate=deep` | Single |
| `/api/about-page?populate=deep` | Single |
| `/api/services-page?populate=deep` | Single |
| `/api/portfolio-page?populate=deep` | Single |
| `/api/blog-page?populate=deep` | Single |
| `/api/contact-page?populate=deep` | Single |
| `/api/partners?populate=deep` | Single |
| `/api/cta?populate=deep` | Single |
| `/api/services?populate=deep` | Collection |
| `/api/categories?populate=deep` | Collection |
| `/api/portfolios?populate[category]=true&populate[technologies]=true` | Collection |
| `/api/blog-posts?populate[author]=true&populate[tags]=true&sort=date:desc` | Collection |

## Project Structure

```
src/
├── api/                  # Content types
│   ├── about-page/       # Single type
│   ├── blog-post/        # Collection type
│   ├── portfolio/        # Collection type
│   ├── service/          # Collection type
│   └── ...               # 16 total content types
├── components/           # Shared components
│   ├── links/            # nav-link, social-link
│   ├── elements/         # process-step, feature-item, etc.
│   └── blocks/           # hero, solutions (dynamic zones)
└── extensions/           # Custom extensions
```

See `Setup-Guide.md` for detailed content schema documentation.

## Scripts

```bash
npm run develop    # Dev with auto-reload
npm run build      # Build admin panel
npm run start      # Production
```

## Deployment

Deploy to Railway, Render, Heroku, or any VPS. Set all `.env` variables in your hosting platform — do not deploy the `.env` file itself.
