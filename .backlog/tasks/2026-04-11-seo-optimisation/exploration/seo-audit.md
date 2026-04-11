# Audit SEO - Etat actuel

## Ce qui existe
- Title tag dynamique (Page | Site)
- charset + viewport
- lang="fr" sur html
- baseURL production configure
- Preconnect Google Fonts
- Alt text sur la plupart des images (sauf carousel)

## Ce qui manque - Critique
- Meta description (aucune page)
- Canonical URL
- robots.txt (enableRobotsTXT non active)
- Sitemap non configure (pas de changefreq/priority)
- Open Graph tags
- Twitter Card tags
- Favicon
- Description frontmatter sur 6/7 pages

## Ce qui manque - Important
- JSON-LD LocalBusiness/BeautySalon (homepage)
- JSON-LD BreadcrumbList (pages internes)
- loading="lazy" sur images below-the-fold
- width/height sur les img
- Alt text carousel generique ("Image 0")
- Sitemap config block

## Hors scope (changement d'architecture)
- Remplacement Tailwind CDN par build pipeline
