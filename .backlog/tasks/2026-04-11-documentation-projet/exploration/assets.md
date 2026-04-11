# Exploration - Assets

## Images (assets/images/)
17 fichiers JPEG, ~64 MB total brut.
Convention de nommage : nom-orientation.jpg (portrait/paysage)

## Pas de fichiers JS/CSS standalone
Tout est inline dans les templates Hugo:
- Tailwind config JS dans baseof.html
- IntersectionObserver dans baseof.html
- Carousel JS dans carousel.html
- Animations CSS dans baseof.html (<style type="text/tailwindcss">)

## Pas de dossier static/
Tous les assets passent par le pipeline Hugo (resources.Get)

## Traitement d'images Hugo
- Services grid: Fill "800x900 Center"
- Complex cards: Fill "600x600 Center"
- Simple portrait: Fill "800x1066 Center"
- Carousel hero: pas de redimensionnement
- Logo: pas de redimensionnement

## Google Fonts
Cardo (serif) - 400/700 regular + 400 italic via CDN
