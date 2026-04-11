# Exploration - Layouts et Templates

## Architecture
Site 100% custom (pas de theme Congo actif). Tailwind CSS via CDN + Go templates Hugo.

## Arborescence
layouts/
  _default/baseof.html - Shell HTML (head, navbar, main, footer)
  _default/prestation.html - Template prestations (dispatch simple/complex)
  _default/rendez-vous.html - Page reservation (widget Planity)
  index.html - Homepage
  partials/navbar.html - Navigation sticky
  partials/footer.html - Footer minimal
  partials/components/carousel.html - Carousel images reutilisable
  partials/components/hero-banner.html - Hero homepage
  partials/home/exclusivity.html - Section Nouveautes
  partials/home/services.html - Grille services
  partials/prestations/layout-complex.html - Layout multi-univers avec drawers
  partials/prestations/layout-simple.html - Layout liste prix 2 colonnes

## Systeme de couleurs
Tokens Tailwind injectes depuis params.toml via bridge JS dans baseof.html.
Ne JAMAIS hardcoder de couleurs.

## Animations
- .reveal-view : slide up + fade (revealUp 1.2s)
- .fade-view : fade in (fadeIn 1.5s)
- IntersectionObserver dans baseof.html (threshold 15%)

## Drawer system
openDrawer()/closeAllDrawers() dans prestation.html uniquement.

## Points d'attention
- Menu mobile : hamburger present mais pas de dropdown fonctionnel
- Horaires hardcodes dans hero-banner.html
- Cle API Planity hardcodee dans rendez-vous.html
