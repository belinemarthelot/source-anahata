# Architecture - Source d'Anahata

## Arborescence des dossiers

```
source-anahata/
├── config/_default/
│   ├── hugo.toml        # Configuration Hugo (baseURL, languageCode, title, disableKinds)
│   ├── params.toml      # Tokens de couleurs (primary, background, text, button)
│   └── menus.toml       # 7 items de navigation
├── content/             # Pages Markdown (frontmatter uniquement, pas de corps)
├── data/                # Fichiers JSON (donnees des prestations et sections)
├── layouts/             # Templates Hugo Go
│   ├── _default/        # Templates de base (baseof, prestation, rendez-vous)
│   ├── partials/        # Composants reutilisables (navbar, footer, hero, carousel...)
│   └── index.html       # Homepage
├── assets/
│   └── images/          # 17 fichiers JPEG (~64 MB), traites par le pipeline Hugo
└── themes/congo/        # Submodule git non initialise - non utilise, site 100% custom
```

### Description des dossiers

- `config/_default/` : configuration Hugo separee en trois fichiers. `params.toml` sert exclusivement a definir les tokens de couleurs injectes dans Tailwind.
- `content/` : pages Markdown dont le corps est vide. Tout le contenu vient des fichiers JSON de `data/`. Le frontmatter declare le layout a utiliser et le fichier de donnees associe.
- `data/` : source de verite pour le contenu des prestations et des sections de la homepage. Chaque fichier JSON correspond a une page ou une section.
- `layouts/` : templates Hugo. Pas de CSS ou JS en fichiers separes - tout le code JS et CSS est inline dans les templates.
- `assets/images/` : images JPEG redimensionnees a la compilation par Hugo (`resources.Get` + `Fill`). Convention de nommage : `nom-orientation.jpg` (portrait ou paysage). Pas de dossier `static/`.
- `themes/congo/` : submodule present dans `.gitmodules` mais non initialise localement. N'a aucun impact sur le site.

---

## Flux de donnees : cycle de vie d'une page prestation

```
content/soins-corps.md
  frontmatter:
    layout: "prestation"
    data_file: "soin-corps"
        |
        v
layouts/_default/prestation.html
  lit .Params.data_file
  charge .Site.Data[data_file]  →  data/soin-corps.json
                                      champ "layout": "complex"
        |
        v
layouts/partials/prestations/layout-complex.html
  itere sur les univers et categories du JSON
  affiche les drawers
```

Le template `prestation.html` agit comme un dispatcher : il lit le champ `layout` du JSON pour decider quel partial appeler (`layout-simple` ou `layout-complex`).

---

## Systeme de layouts

### Shell principal

- **`_default/baseof.html`** : squelette HTML commun a toutes les pages. Contient le `<head>` (Tailwind CDN, Google Fonts Cardo, bridge JS couleurs), la navbar, le `<main>` (block Hugo), le footer, les animations CSS (`@keyframes`) et l'IntersectionObserver.

### Templates de page

- **`_default/prestation.html`** : template utilise par toutes les pages de prestation. Lit `data_file` depuis le frontmatter, charge le JSON correspondant, puis dispatche vers `layout-simple` ou `layout-complex` selon le champ `layout` du JSON. Contient aussi les fonctions JS `openDrawer()` et `closeAllDrawers()` (uniquement pour `layout-complex`).

- **`_default/rendez-vous.html`** : page de reservation. Integre le widget Planity via script JS.

- **`index.html`** : homepage. Compose les partials `exclusivity.html`, `hero-banner.html` et `services.html`.

### Partials de prestation

- **`partials/prestations/layout-simple.html`** : liste de prix en 2 colonnes. Utilise par : epilation, onglerie, beaute-du-regard.
- **`partials/prestations/layout-complex.html`** : grille d'univers avec drawers d'ouverture/fermeture. Utilise par : soins-corps, soin-visage.

### Partials communs

- `partials/navbar.html` : navigation sticky
- `partials/footer.html` : footer minimal
- `partials/components/hero-banner.html` : hero de la homepage avec horaires
- `partials/components/carousel.html` : carousel d'images reutilisable
- `partials/home/exclusivity.html` : section Nouveautes
- `partials/home/services.html` : grille des services

---

## Systeme de couleurs

Les couleurs sont definies une seule fois dans `config/_default/params.toml` sous forme de tokens. Un bridge JS dans `baseof.html` les injecte dans la configuration Tailwind.

| Token params.toml | Classe Tailwind | Valeur |
|-------------------|-----------------|--------|
| `primary` | `bg-primary`, `text-primary` | `#6BDDB0` |
| `primary_light` | `bg-primary-light` | `#DDF7EC` |
| `primary_dark` | `bg-primary-dark`, `text-primary-dark` | `#00C27B` |
| `background_default` | `bg-background-default` | `#FDFBF7` |
| `background_paper` | `bg-background-paper` | `#F4F0E6` |
| `text_main` | `text-text-main` | `#3D3D3D` |
| `text_muted` | `text-text-muted` | `#71717A` |
| `button_bg` | `bg-btn-bg` | `#3D3D3D` |
| `button_text` | `text-btn-text` | `#FFFFFF` |

Note : dans `params.toml`, les cles utilisent des underscores (`primary_light`). Dans les templates, les classes Tailwind utilisent des tirets (`bg-primary-light`). Les tokens de bouton sont mappes sous le prefixe `btn` (pas `button`).

**Regle absolue : ne jamais hardcoder de couleurs dans les templates. Toujours utiliser les classes Tailwind issues des tokens.**

---

## Systeme d'animations

Deux classes CSS declenchent des animations au scroll :

- **`.reveal-view`** : slide up + fade in (keyframe `revealUp`, duree 1.2s)
- **`.fade-view`** : fade in simple (keyframe `fadeIn`, duree 1.5s)

Ces animations sont definies dans un bloc `<style type="text/tailwindcss">` dans `baseof.html`.

Un `IntersectionObserver` (seuil 15%) est initialise dans `baseof.html` : quand un element `.reveal-view` ou `.fade-view` entre dans le viewport, la classe `is-visible` lui est ajoutee, ce qui declenche l'animation.

Pour creer un effet de stagger (animations en cascade), utiliser la propriete `animation-delay` sur les elements enfants.

---

## Points d'attention et limitations connues

- **Menu mobile** : le hamburger est present dans la navbar mais aucun dropdown fonctionnel ne lui est associe. Le menu mobile est non operationnel.
- **Horaires** : les horaires d'ouverture sont hardcodes dans `partials/components/hero-banner.html`. Toute modification doit etre faite directement dans ce fichier.
- **Cle API Planity** : la cle d'integration du widget de reservation est hardcodee dans `layouts/_default/rendez-vous.html`.
- **Typo dans un nom de fichier** : le fichier `data/insitut-presentation.json` contient une faute de frappe (`insitut` au lieu de `institut`). Ce nom est reference tel quel dans le template qui le consomme - ne pas renommer sans mettre a jour la reference.
