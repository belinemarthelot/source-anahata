# Specs - Optimisation SEO

## Objectif
Optimiser le SEO du site institut-source-anahata.fr avec le contenu existant, sans changement d'architecture.

## Perimetre

### 1. Meta tags dans baseof.html
- Meta description : `{{ with .Description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}`
- Canonical URL : `<link rel="canonical" href="{{ .Permalink }}">`
- Open Graph : og:title, og:description, og:image, og:url, og:type, og:locale
- Twitter Card : twitter:card, twitter:title, twitter:description, twitter:image
- Favicon : lien vers logo-source.jpg

### 2. Configuration Hugo
- hugo.toml : ajouter enableRobotsTXT = true + block [sitemap]
- params.toml : ajouter description site-wide, author, image par defaut pour OG

### 3. Descriptions dans le contenu (frontmatter)
Ajouter `description` a chaque page :
- _index.md : garder l'existante, la rallonger si besoin
- soins-corps.md : basee sur le body text existant
- visage.md : basee sur le body text existant
- epilations.md : basee sur le body text existant
- beaute-du-regard.md : basee sur le body text existant
- onglerie.md : basee sur le body text existant
- rendez-vous.md : description de la page de reservation

### 4. Donnees structurees JSON-LD
- Homepage : schema BeautySalon (nom, adresse Prenois 21370, horaires extraits de hero-banner.html)
- Homepage : schema WebSite
- Pages prestation : schema BreadcrumbList

### 5. Optimisation images
- Carousel : alt text descriptif au lieu de "Image {{ $index }}"
- Toutes les images below-the-fold : loading="lazy"
- Ajouter width/height sur les img Hugo (via .Width/.Height apres Fill)

### 6. robots.txt
- Genere automatiquement par Hugo (enableRobotsTXT)
- Template layouts/robots.txt avec Sitemap URL

## Fichiers impactes

| Fichier | Action |
|---------|--------|
| layouts/_default/baseof.html | Meta tags, OG, Twitter, favicon, JSON-LD |
| config/_default/hugo.toml | enableRobotsTXT, sitemap block |
| config/_default/params.toml | description, author, image OG |
| content/_index.md | Ajuster description |
| content/soins-corps.md | Ajouter description |
| content/visage.md | Ajouter description |
| content/epilations.md | Ajouter description |
| content/beaute-du-regard.md | Ajouter description |
| content/onglerie.md | Ajouter description |
| content/rendez-vous.md | Ajouter description |
| layouts/partials/components/carousel.html | Alt text, lazy loading |
| layouts/partials/home/services.html | lazy loading, width/height |
| layouts/partials/prestations/layout-simple.html | lazy loading, width/height |
| layouts/partials/prestations/layout-complex.html | lazy loading, width/height |
| layouts/robots.txt | Creation (template Hugo) |
| layouts/partials/seo/json-ld.html | Creation (donnees structurees) |

## Hors perimetre
- Migration Tailwind CDN → build local
- Ajout de nouveau contenu textuel
- Optimisation des images sources (compression)
- Service worker / cache strategy
