# LlamaForge Headless WordPress + Astro JS

A high-performance, secure, and flexible website built for **LlamaForge** (a SaaS product for fine-tuning and running local LLMs as serverless APIs) using **Astro JS** as a decoupled frontend and **WordPress** as a headless Content Management System (CMS).

---

## 🌟 Headless Architecture Advantages

Decoupling WordPress (backend CMS) from Astro (frontend representation layer) offers massive technical and operational advantages over traditional monolithic WordPress setups:

### 1. Lightning-Fast Speeds (Astro SSR)
Traditional monolithic WordPress sites run slow database queries and render complex PHP template structures on the server for *every single page view*. LlamaForge leverages Astro's hyper-optimized server-side rendering (SSR). It queries the REST API asynchronously, caches key resources, and outputs lightweight, compiled HTML/CSS. This results in sub-second load times and near-perfect Lighthouse performance scores.

### 2. Design Consistency & "Editor Safeguards"
In typical WordPress sites utilizing visual builders (like Elementor or Divi), content editors can easily break layout structures, alter global margins, fonts, or colors. Under our headless architecture:
* All design rules, responsive spacing, and style tokens are locked in the codebase ([global.css](file:///a:/headless%20wp/src/styles/global.css)).
* Editors only interact with clean, form-based inputs (headlines, descriptions, URLs) inside WordPress Gutenberg blocks.
* This guarantees that no matter what the editor inputs, the frontend remains 100% polished, responsive, and brand-consistent.

### 3. Enterprise-Grade Decoupled Security
Monolithic WordPress is one of the most targeted systems on the web. By separating it:
* The WordPress admin interface and MySQL database live on a private, hidden domain (e.g., `http://tnv-headless.local/wp-admin/` or a restricted server).
* The public-facing website runs on a completely different public URL, executing compiled Astro code.
* Attackers have zero access to the backend database or admin login panel from the public site, completely eliminating common PHP injection, SQL injection, and plugin exploit vectors.

### 4. Dynamic Live Previews & Instant Updates
Despite being decoupled, editors retain full real-time draft previews. Clicking "Preview" in the WordPress editor securely redirects to our Astro [preview.astro](file:///a:/headless%20wp/src/pages/preview.astro) route, which queries draft revisions from a custom WordPress endpoint and renders pages live before publication.

---

## 🛠️ Project Structure

```text
/
├── src/
│   ├── components/
│   │   ├── Header.astro           # Dynamic navigation bar (excludes dynamic dropdowns for clean design)
│   │   ├── Footer.astro           # Rebranded LlamaForge global footer
│   │   ├── BlockRenderer.astro    # Dispatcher that renders Gutenberg blocks in edit order
│   │   ├── Hero.astro             # Static fallback Hero component
│   │   ├── SocialProof.astro      # Static fallback partners section (NVIDIA, HuggingFace)
│   │   ├── HowItWorks.astro       # Static fallback 4-stage ML pipeline roadmap
│   │   ├── Outcomes.astro         # Static fallback SaaS metric cards
│   │   ├── Features.astro         # Static fallback interactive console/telemetry mockups
│   │   ├── Guides.astro           # Static fallback Lead AI Architects slider
│   │   ├── Pricing.astro          # Static fallback developer/enterprise compute tiers
│   │   ├── BlogSection.astro      # Dynamic blog section rendering WordPress posts
│   │   ├── Faq.astro              # Dynamic FAQ accordion component
│   │   └── blocks/                # Visual components representing Gutenberg block layouts:
│   │       ├── HeroBlock.astro
│   │       ├── StatsBlock.astro
│   │       ├── TimelineBlock.astro
│   │       ├── FeaturesGrid.astro
│   │       ├── CtaBlock.astro
│   │       ├── FaqBlock.astro
│   │       └── RichTextBlock.astro
│   ├── layouts/
│   │   └── Layout.astro           # Main page structure, HSL styling variables, and meta tags
│   ├── lib/
│   │   ├── wordpress.ts           # REST API fetch utility & dynamic rebrand mapping layer
│   │   └── blocks.ts              # TypeScript interfaces for Gutenberg blocks
│   └── pages/
│       ├── index.astro            # Homepage (renders Gutenberg blocks or falls back to static landing components)
│       ├── [slug].astro           # Dynamic routing template for generic WordPress pages
│       ├── preview.astro          # Secure Live Preview route for WordPress draft reviews
│       ├── models/                # Subpage routes representing AI Models (formerly Standards)
│       ├── fine-tuning/           # Subpage routes representing Fine-Tuning Recipes (formerly Certifications)
│       └── deployments/           # Subpage routes representing Deployment Targets (formerly Countries)
├── .env                           # Environment configuration
└── astro.config.mjs               # Astro configuration file (Astro Node SSR Adapter enabled)
```

---

## 🔌 Connecting to a Different Headless WordPress Backend

If you want to point this Astro frontend to another WordPress instance, follow these steps:

### 1. Update the Environment Variable
Open the [.env](file:///a:/headless%20wp/.env) file at the root of the project and update the API URL pointing to the new WordPress instance:
```ini
WORDPRESS_API_URL=http://your-new-wordpress-domain.com/wp-json/wp/v2
```

### 2. Add PHP Block Code to WordPress Theme
Our page builder uses Gutenberg custom blocks powered by the **Lazy Blocks** plugin. You do not need to manually configure them in the WordPress admin panel.
Copy the PHP code block from the [wordpress_gutenberg_setup.md](file:///C:/Users/Adarsh/.gemini/antigravity/brain/d5086fd0-5155-4025-a62b-4c2036accd10/wordpress_gutenberg_setup.md) guide and paste it at the bottom of the active theme's `functions.php` file on your new WordPress instance. 

This script:
1. Programmatically registers all 7 custom blocks (Hero, Stats, Timeline, Features Grid, FAQ, CTA, Rich Text) inside the block editor.
2. Exposes block JSON structures directly in the REST API payload under a custom `blocks` array.
3. Sets up the secure `/tnv/v1/preview` draft fetching endpoint.
4. Rewrites the WordPress preview link logic to route requests to your Astro frontend URL.

---

## 🔄 Dynamic Rebranding Mapping Layer

To prevent old database copy (which may contain legacy TNV Certification / ISO auditing keywords) from displaying on the frontend, this codebase features a dynamic rebrand mapping layer inside [wordpress.ts](file:///a:/headless%20wp/src/lib/wordpress.ts):

* **Path mapping:** When slugs matching `standards`, `certifications`, or `countries` are queried, the API wrapper automatically queries their WordPress counterparts (`standards`, `certifications`, `countries`) and translates them to `models`, `fine-tuning`, and `deployments`.
* **Slug rebrands:** The system intercepts old URL slugs and replaces them:
  * `iso-9001` → `llama-3` (foundation model specifications)
  * `ce-marking` → `qlora` (quantized low-rank adaptation training recipes)
* **Blog post interceptor:** The mapping layer intercepts compliance blog posts (such as `iso-90012015-audit-best-practices`) and maps them to clean AI developer blogs like **"Best Practices for Fine-Tuning Large Language Models"**, translating titles, excerpts, and body texts on the fly.

---

## ⚙️ Basic Setup

### 1. Install Dependencies
Run the install command in the root folder:
```sh
npm install
```

### 2. Run Local Development Server
Start the local server (runs on `http://localhost:4321`):
```sh
npm run dev
```

### 3. Build for Production
Compiles the static assets and server entrypoints into the `./dist/` folder:
```sh
npm run build
```

---

## 🧞 Available Developer Commands

All commands are run from the project root:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Astro dev server at `localhost:4321` |
| `npm run build` | Builds your production-ready site to the `./dist/` directory |
| `npm run preview` | Previews the build output locally |
| `npm run astro check` | Runs diagnostic check on types and files |
