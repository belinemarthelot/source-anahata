# Audit Performance et SEO - Source d'Anahata

**Date** : 2026-04-11
**URL** : https://institut-source-anahata.fr
**Stack** : Hugo 0.160.1 + Tailwind CSS CDN + Google Fonts Cardo
**Analyse** : locale (build Hugo)

---

## Scores globaux

| Categorie | Score | Verdict |
|-----------|-------|---------|
| **SEO** | 6/10 | Les bases sont en place (meta, OG, JSON-LD) mais les titres sont trop courts et les accents manquent |
| **Performance** | 3/10 | Images hero non compressees (10 MB), Tailwind CDN bloquant (~350 KB) |
| **Accessibilite** | 4/10 | Lang, viewport OK mais focus, ARIA, clavier, hierarchie headings en echec |
| **Bonnes pratiques** | 7/10 | HTTPS, pas de mixed content, robots.txt, sitemap OK |

---

## 1. PERFORMANCE

### 1.1 Probleme critique : Images hero non traitees

Les 3 images du carousel hero sont servies a leur taille originale sans aucune compression Hugo :

| Image | Taille | Position |
|-------|--------|----------|
| accueil-portrait.jpg | **4.2 MB** | Above the fold (LCP) |
| accueilensemble-portrait.jpg | **2.6 MB** | Carousel slide 2 |
| flyeraccueil-portrait.jpg | **3.3 MB** | Carousel slide 3 |
| **Total** | **10.1 MB** | |

**Cause** : `carousel.html` utilise `$img.RelPermalink` directement au lieu de `$img.Fill` ou `$img.Resize`.
**Impact** : LCP > 10s sur connexion mobile, bounce rate eleve.

### 1.2 Probleme critique : Tailwind CSS CDN

Le site charge `https://cdn.tailwindcss.com` (~350 KB, non minifie) en mode bloquant dans le `<head>` :
- Pas de `defer` ni `async`
- Le navigateur ne peut rien afficher tant que le script n'est pas charge et execute
- Le moteur Tailwind re-genere le CSS a chaque chargement de page
- Un build Tailwind CLI produirait < 20 KB de CSS purge

### 1.3 Probleme important : Pas de WebP/AVIF

Toutes les images sont en JPEG. Hugo supporte `.Process "webp"` nativement. Gain estime : 30-50% de poids supplementaire.

### 1.4 Metriques de taille

| Element | Taille |
|---------|--------|
| Dossier public/ total | 13 MB |
| Homepage HTML | 40 KB |
| Soins Corps HTML | 39 KB |
| Images originales (assets/) | 61 MB total |
| Images traitees (Hugo cache) | 920 KB (15 fichiers) |
| Images non traitees (hero) | 10.1 MB |

### 1.5 Rendering bloquant

4 ressources bloquantes dans le `<head>` :
1. Google Fonts stylesheet (synchrone)
2. Tailwind CDN script (pas de defer)
3. Tailwind config inline script
4. Style Tailwind CSS inline

Pas de `<link rel="preload">` pour l'image LCP du carousel.
Pas de `fetchpriority="high"` sur la premiere image.

---

## 2. SEO

### 2.1 Ce qui fonctionne

| Element | Statut |
|---------|--------|
| Meta description | Present sur toutes les pages |
| Canonical URL | Present et correct |
| Open Graph | Complet (title, description, image, url, type, locale) |
| Twitter Card | summary_large_image sur toutes les pages |
| JSON-LD Homepage | WebSite + BeautySalon (adresse, horaires) |
| JSON-LD Pages | BreadcrumbList |
| robots.txt | Present, sitemap declare |
| sitemap.xml | 7 pages, URLs production correctes |
| Favicon | Present (logo) |

### 2.2 Problemes par page

| Page | Titre (chars) | Probleme |
|------|---------------|----------|
| Homepage | 50 | H2 "Nouveautes" avant H1 dans le DOM |
| Soins Corps | 31 | Titre trop court, og:type "article" |
| Visage | 32 | Titre trop court, og:type "article" |
| Epilations | 30 | Titre trop court, pas de H2, og:type "article" |
| Beaute du Regard | 36 | Titre trop court, pas de H2 |
| Onglerie | 28 | Titre le plus court du site, pas de H2 |
| Rendez-vous | 39 | Description 123 chars (trop court), contenu 100% JS |

### 2.3 Problemes transversaux

- **Titres trop courts** : 28-39 chars sur 6/7 pages (ideal : 50-60). Manque le mot-cle "Prenois".
- **Accents manquants** : toutes les meta descriptions utilisent "a Prenois" au lieu de "a Prenois", "beaute" au lieu de "beaute", etc. Affecte le CTR dans les SERPs.
- **og:type "article"** sur les pages de services : devrait etre "website".
- **Meme og:image partout** : accueil-portrait.jpg sur toutes les pages. Pas d'image specifique par page.
- **Pas de telephone/email** dans le schema BeautySalon.
- **Pas de schema Service** sur les pages de prestations.
- **Sitemap** : pas de `<lastmod>`, homepage a priority 0.5 (devrait etre 1.0).

---

## 3. ACCESSIBILITE

### 3.1 PASS

| Check | Statut |
|-------|--------|
| `lang="fr"` sur `<html>` | PASS |
| Meta viewport | PASS |
| Toutes les images ont un alt | PASS |
| Contraste texte principal (#3D3D3D sur #FDFBF7) | PASS (10.4:1) |
| Contraste boutons (#FFF sur #3D3D3D) | PASS (10.4:1) |
| ARIA labels navbar (hamburger, close) | PASS |
| Semantique `<nav>`, `<main>`, `<footer>` | PASS |

### 3.2 FAIL

| Check | Probleme |
|-------|----------|
| **Focus styles** | `focus:outline-none` sans remplacement sur les boutons navbar |
| **Cards `<div onclick>`** | Pas de `<button>`, pas de `tabindex`, pas de keyboard handler |
| **Drawers** | Pas de `role="dialog"`, pas de `aria-modal`, pas de gestion du focus |
| **`aria-expanded`** | Manquant sur le hamburger |
| **Skip-to-content** | Absent |
| **Navigation en `<ul>/<li>`** | Les liens sont dans des `<div>`, pas des listes |
| **Carousel ARIA** | Pas de `aria-label` sur les fleches et les dots |
| **H2 avant H1** | Homepage : "Nouveautes" (H2) apparait avant "Source d'Anahata" (H1) |
| **H2 manquant** | 4 pages (epilations, beaute-du-regard, onglerie, rendez-vous) sautent de H1 a H3 |
| **Contraste primary_dark** | #00C27B sur #FDFBF7 = 3.0:1 (FAIL pour petit texte) |

---

## 4. PLAN D'ACTION PRIORISE

### P0 - Critique (impact direct sur Core Web Vitals)

| # | Action | Fichier(s) | Impact |
|---|--------|------------|--------|
| 1 | **Compresser les images carousel** via Hugo Fill + Process webp | carousel.html | LCP : -10 MB → ~300 KB |
| 2 | **Migrer Tailwind CDN → build CLI** | baseof.html, package.json | Render-blocking : -350 KB → ~20 KB |
| 3 | **Ajouter preload LCP** : `<link rel="preload">` + `fetchpriority="high"` | baseof.html, carousel.html | LCP ameliore |

### P1 - Important (SEO + Accessibilite)

| # | Action | Fichier(s) | Impact |
|---|--------|------------|--------|
| 4 | **Allonger les titres** avec mot-cle local "Prenois" | content/*.md ou baseof.html | CTR SERP |
| 5 | **Corriger les accents** dans les meta descriptions | content/*.md, params.toml | CTR SERP |
| 6 | **Corriger og:type** → "website" pour les pages de service | baseof.html | Partage social |
| 7 | **Focus styles** : remplacer `focus:outline-none` | navbar.html | Accessibilite clavier |
| 8 | **Cards `<div>` → `<button>`** ou `role="button" tabindex="0"` | layout-complex.html | Accessibilite clavier |
| 9 | **Drawer ARIA** : role="dialog", aria-modal, focus trap | layout-complex.html, prestation.html | Accessibilite |
| 10 | **Skip-to-content** | baseof.html | Accessibilite navigation |

### P2 - Moyen (ameliorations)

| # | Action | Fichier(s) | Impact |
|---|--------|------------|--------|
| 11 | Ajouter telephone/email au schema BeautySalon | seo/json-ld.html | SEO local |
| 12 | Schema Service/ItemList sur pages prestation | seo/json-ld.html | Rich results |
| 13 | Images WebP pour toutes les images (pas seulement hero) | tous les layouts avec .Fill | Performance |
| 14 | width/height sur carousel + logo | carousel.html, navbar.html | CLS |
| 15 | Navigation en `<ul>/<li>` | navbar.html | Accessibilite |
| 16 | Corriger hierarchie H1/H2 homepage | index.html ou partials | SEO + A11y |
| 17 | Ajouter H2 sur pages simple layout | layout-simple.html ou prestation.html | SEO |
| 18 | `aria-expanded` sur hamburger | navbar.html JS | Accessibilite |
| 19 | `prefers-reduced-motion` pour animations | baseof.html | Accessibilite |
| 20 | og:image specifique par page | content/*.md, baseof.html | Partage social |

---

## 5. ESTIMATION D'IMPACT

### Si P0 implemente (images + Tailwind build)

| Metrique | Avant | Apres estime |
|----------|-------|--------------|
| Poids homepage | ~13 MB | ~500 KB |
| LCP (3G) | > 15s | < 3s |
| Render-blocking | 4 ressources | 1 (fonts) |
| Score Performance Lighthouse estime | ~20-30 | ~70-85 |

### Si P0 + P1 implemente

| Metrique | Avant | Apres estime |
|----------|-------|--------------|
| Score SEO Lighthouse estime | ~75 | ~95 |
| Score Accessibilite Lighthouse estime | ~55 | ~80 |
| Titres optimises pour local SEO | 1/7 | 7/7 |
