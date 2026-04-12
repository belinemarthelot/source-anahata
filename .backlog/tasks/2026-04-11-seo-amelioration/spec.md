# Specs - Amelioration SEO (depuis audit)

## Source
Audit : .audit/2026-04-11-audit-perf-seo.md - Section 2 (SEO) et actions P1/P2

## Perimetre (SEO uniquement, pas la performance ni l'accessibilite)

### 1. Allonger les titres avec mot-cle local
Ajouter "a Prenois" et des descripteurs dans les titres. Modifier via le frontmatter `title` des content/*.md.

| Page | Titre actuel (chars) | Titre propose |
|------|---------------------|---------------|
| _index.md | Source d'Anahata - Institut de bien-etre a Prenois (50) | Garder tel quel (OK) |
| soins-corps.md | Soins Corps (11) | Soins Corps et Massages a Prenois |
| visage.md | Soins Visage (12) | Soins Visage a Prenois - Phyt's, Biodroga, Magic Face |
| epilations.md | Epilations (10) | Epilations a la Cire a Prenois - Perron Rigot |
| beaute-du-regard.md | Beaute du Regard (17) | Beaute du Regard a Prenois - Yumi Lashes et Brows |
| onglerie.md | Onglerie (8) | Onglerie a Prenois - Semi-permanent et Soins |
| rendez-vous.md | Prendre Rendez-vous (19) | Prendre Rendez-vous a Prenois |

### 2. Corriger les accents dans les meta descriptions
Remplacer les descriptions sans accents par des versions avec accents corrects dans le frontmatter `description` de chaque content/*.md et dans params.toml [seo].description.

### 3. Corriger og:type
Dans baseof.html, changer og:type de "article" a "website" pour les pages non-homepage.

### 4. Ajouter telephone au schema BeautySalon
Dans seo/json-ld.html, ajouter le champ "telephone" au schema. Demander le numero a l'utilisateur.

### 5. Corriger hierarchie H1/H2 homepage
Dans layouts/index.html, inverser l'ordre : hero-banner AVANT exclusivity pour que H1 apparaisse avant H2 dans le DOM.

### 6. Ajouter H2 sur pages layout simple
Dans layouts/_default/prestation.html ou layout-simple.html, ajouter un H2 "Nos prestations" entre le H1 et les H3.

### 7. Guard resources.Get dans json-ld.html
Ajouter un {{ with }} guard autour de resources.Get pour eviter une erreur de build si l'image n'existe pas.

## Fichiers impactes

| Fichier | Action |
|---------|--------|
| content/soins-corps.md | title + description accents |
| content/visage.md | title + description accents |
| content/epilations.md | title + description accents |
| content/beaute-du-regard.md | title + description accents |
| content/onglerie.md | title + description accents |
| content/rendez-vous.md | title + description accents |
| content/_index.md | description accents |
| config/_default/params.toml | seo.description accents |
| layouts/_default/baseof.html | og:type fix |
| layouts/index.html | ordre des partials |
| layouts/_default/prestation.html | H2 ajout |
| layouts/partials/seo/json-ld.html | telephone + guard |

## Hors perimetre
- Performance (images carousel, Tailwind CDN) → tache separee
- Accessibilite (focus, ARIA, clavier) → tache separee
- og:image specifique par page (necessite refactor du frontmatter)
- Schema Service sur pages prestation (complexite elevee)
