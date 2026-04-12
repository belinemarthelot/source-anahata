# Audit Performance et SEO v2 - Source d'Anahata

**Date** : 2026-04-11 (post-corrections)
**Comparaison avec** : .audit/2026-04-11-audit-perf-seo.md

---

## Scores globaux (avant → apres)

| Categorie | Avant | Apres | Evolution |
|-----------|-------|-------|-----------|
| **SEO** | 6/10 | **8/10** | +2 |
| **Performance** | 3/10 | **3/10** | = (pas touche) |
| **Accessibilite** | 4/10 | **4.5/10** | +0.5 (headings fixes) |
| **Bonnes pratiques** | 7/10 | **7.5/10** | +0.5 |

---

## 1. SEO - CE QUI A ETE CORRIGE

| Probleme | Avant | Apres | Statut |
|----------|-------|-------|--------|
| Titres trop courts (28-39 chars) | FAIL | 48-72 chars avec "Prenois" + marques | PASS (2 titres > 60 chars → WARN) |
| Accents manquants | FAIL | Accents corrects partout | PASS |
| og:type "article" sur pages service | FAIL | "website" partout | PASS |
| Pas de telephone dans BeautySalon | FAIL | +33 6 42 68 91 01 present | PASS |
| H2 avant H1 homepage | FAIL | Hero en premier (H1 avant H2) | PASS |
| H2 manquant sur pages simples | FAIL | H2 "Nos prestations" (sr-only) | PASS |
| Guard resources.Get dans JSON-LD | WARN | {{ with }} guard ajoute | PASS |

### SEO - CE QUI RESTE

| Probleme | Priorite | Detail |
|----------|----------|--------|
| Titre `/visage/` trop long | HAUTE | 72 chars → sera tronque dans les SERPs. Raccourcir. |
| Titre `/beaute-du-regard/` trop long | HAUTE | 68 chars → sera tronque. Raccourcir. |
| Description `/beaute-du-regard/` trop courte | HAUTE | 129 chars (ideal 150+) |
| Description `/epilations/` courte | MOYENNE | 139 chars (ideal 150+) |
| og:title homepage ≠ title | BASSE | og:title = "Source d'Anahata" seulement |
| Meme og:image sur toutes les pages | BASSE | accueil-portrait.jpg partout |
| Sitemap : pas de lastmod, homepage priority 0.5 | BASSE | Hugo ne genere pas lastmod sans dates Git |
| Alt images pages simples generiques | BASSE | "Epilations", "Onglerie" → phrases descriptives |

---

## 2. PERFORMANCE - INCHANGE

Les problemes de performance n'ont pas ete traites dans cette iteration.

### Problemes critiques restants

| # | Probleme | Impact |
|---|----------|--------|
| 1 | **Images carousel hero non compressees** : 4.2 + 3.3 + 2.6 = **10.1 MB** above the fold | LCP > 15s sur mobile |
| 2 | **Tailwind CDN bloquant** : ~360 KB script non-defere dans `<head>` | First Paint bloque |
| 3 | **Pas de WebP** : aucune image en format moderne | +30-50% de poids evitable |
| 4 | **Pas de fetchpriority/preload** sur l'image LCP | Browser ne priorise pas |
| 5 | **Pas de width/height** sur carousel + logo | CLS (Cumulative Layout Shift) |

### Poids estime homepage : ~11 MB+

---

## 3. ACCESSIBILITE - PARTIELLEMENT AMELIORE

### Corrige

| Check | Avant | Apres |
|-------|-------|-------|
| H1 avant H2 homepage | FAIL | PASS |
| H2 present sur pages prestation | FAIL | PASS (sr-only) |

### Toujours en echec (8/11 checks)

| # | Check | Statut | Fichier |
|---|-------|--------|---------|
| 1 | **Focus styles** (focus:outline-none sans remplacement) | FAIL | navbar.html |
| 2 | **Cards `<div onclick>`** (pas keyboard-accessible) | FAIL | layout-complex.html |
| 3 | **Drawers sans ARIA** (pas de role="dialog", aria-modal) | FAIL | layout-complex.html |
| 4 | **Skip-to-content** absent | FAIL | baseof.html |
| 5 | **Nav pas en `<ul>/<li>`** | FAIL | navbar.html |
| 6 | **aria-expanded** manquant sur hamburger | FAIL | navbar.html |
| 7 | **Carousel ARIA** (fleches et dots sans labels) | FAIL | carousel.html |
| 8 | **prefers-reduced-motion** non supporte | FAIL | baseof.html, carousel.html |
| 9 | **Contraste primary_dark** (#00C27B sur creme = 3.0:1) | WARN | Small text prices |

---

## 4. PLAN D'ACTION RESTANT (priorise)

### P0 - Performance (impact utilisateur maximal)

| # | Action | Gain estime |
|---|--------|-------------|
| 1 | Compresser images carousel via Hugo Fill + WebP | -10 MB → ~300 KB |
| 2 | Migrer Tailwind CDN → build CLI | -360 KB render-blocking |
| 3 | fetchpriority="high" + preload sur image LCP | LCP ameliore |

### P1 - SEO (corrections rapides)

| # | Action | Fichier |
|---|--------|---------|
| 4 | Raccourcir titres visage et beaute-du-regard (< 60 chars) | content/*.md |
| 5 | Allonger description beaute-du-regard (150+ chars) | content/beaute-du-regard.md |

### P2 - Accessibilite

| # | Action | Fichier |
|---|--------|---------|
| 6 | Focus styles (focus-visible:ring-2) | navbar.html |
| 7 | Cards div → button (ou role="button" tabindex="0") | layout-complex.html |
| 8 | Drawer ARIA (role="dialog", aria-modal, focus trap) | layout-complex.html, prestation.html |
| 9 | Skip-to-content link | baseof.html |
| 10 | Nav en ul/li | navbar.html |
| 11 | aria-expanded hamburger | navbar.html JS |
| 12 | Carousel ARIA labels | carousel.html |
| 13 | prefers-reduced-motion | baseof.html, carousel.html |
