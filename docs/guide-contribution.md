# Guide de contribution — Source d'Anahata

Ce guide décrit comment modifier le site pas à pas. Chaque section est autonome et suffisamment détaillée pour être suivie sans connaissance préalable du projet.

---

## 1. Ajouter une nouvelle page de prestation

Une page de prestation repose sur quatre éléments : un fichier de contenu, un fichier de données, des images et une entrée de menu. Il faut également ajouter une carte dans la grille de la page d'accueil.

### 1a. Créer le fichier de contenu

Créer le fichier `content/<slug>.md` en remplaçant `<slug>` par le nom URL de la prestation (minuscules, tirets, sans accents).

Structure obligatoire :

```markdown
---
title: "Nom de la prestation"
data_file: "<slug-du-fichier-json>"
layout: "prestation"
---

Texte introductif de la prestation. Ce texte apparaît en haut de la page.
```

Règles :

- `title` : nom affiché en titre de page.
- `data_file` : nom du fichier JSON dans `data/` **sans l'extension `.json`**. Exemple : si le fichier est `data/massage.json`, écrire `data_file: "massage"`.
- `layout` doit toujours valoir `"prestation"`.
- Le texte introductif est libre, mais doit être présent.

Exemple concret (page Épilations) :

```markdown
---
title: "Épilations"
data_file: "epilation"
layout: "prestation"
---

Une peau douce et nette grâce à l'utilisation de la marque française **Perron Rigot**, pour un soin sur-mesure respectueux de votre peau.
```

### 1b. Créer le fichier de données JSON

Créer le fichier `data/<slug>.json`. Deux schémas sont disponibles selon la complexité de la prestation.

#### Schéma simple

Utiliser ce schéma pour une prestation avec une liste de prix directe (pas de sous-catégories).

```json
{
  "title": "Nom de la prestation",
  "layout": "simple",
  "images": ["nom-portrait.jpg"],
  "prestations": [
    {
      "title": "Nom du soin - durée",
      "description": "Description optionnelle",
      "price": 25
    },
    {
      "title": "Autre soin - durée",
      "description": "",
      "price": 35
    }
  ]
}
```

Règles du schéma simple :

- `layout` doit valoir `"simple"`.
- `images` : tableau d'un ou plusieurs noms de fichiers présents dans `assets/images/`.
- `prestations` : tableau d'objets. Chaque objet a :
  - `title` : nom du soin, inclure la durée si pertinent.
  - `description` : chaîne vide `""` si aucune description.
  - `price` : nombre entier (en euros) ou chaîne vide `""` pour une ligne sans prix (note, en-tête).

#### Schéma complex

Utiliser ce schéma pour une prestation organisée en univers ou familles de soins (ex. Soins Corps, Visage).

```json
{
  "title": "Nom de la prestation",
  "layout": "complex",
  "images": ["nom-portrait.jpg"],
  "univers": [
    {
      "name": "Nom de l'univers",
      "description": "Description de l'univers",
      "image": "nom-image-univers.jpg",
      "prestations": [
        {
          "title": "Nom du soin",
          "description": "Description du soin",
          "price": 66
        },
        {
          "title": "Soin avec options",
          "description": "Description",
          "price": 0,
          "options": [
            { "title": "Option A", "price": 45 },
            { "title": "Option B", "price": 60 }
          ]
        }
      ]
    }
  ]
}
```

Règles du schéma complex :

- `layout` doit valoir `"complex"`.
- `univers` : tableau d'univers. Chaque univers a :
  - `name` : nom affiché dans l'interface (drawer).
  - `description` : texte présentant l'univers.
  - `image` : nom d'un fichier présent dans `assets/images/`.
  - `prestations` : même structure que le schéma simple, avec le champ optionnel `options` pour les soins à plusieurs durées/formats.
- Une prestation avec `price: 0` et sans `options` est rendue comme un en-tête de groupe à l'intérieur d'un univers.

### 1c. Ajouter les images

Déposer les images dans `assets/images/`.

Convention de nommage :

- Format : `nom-de-la-prestation-portrait.jpg` et `nom-de-la-prestation-paysage.jpg`.
- Minuscules, mots séparés par des tirets, pas d'accents, pas d'espaces.
- Extension `.jpg` uniquement.

Exemples valides : `massage-ayurvedique-portrait.jpg`, `massage-ayurvedique-paysage.jpg`.

Dimensions recommandées selon l'usage :

| Usage | Traitement Hugo | Dimensions sources conseillées |
|---|---|---|
| Image de la grille homepage | 800x900 (recadrage centré) | 1600x1800 minimum |
| Image des cartes complex | 600x600 (recadrage centré) | 1200x1200 minimum |
| Portrait page simple | 800x1066 (recadrage centré) | 1600x2132 minimum |

Hugo recadre automatiquement les images à l'affichage. Fournir des images avec une résolution suffisante pour éviter la pixellisation.

### 1d. Ajouter l'entrée dans le menu

Éditer `config/_default/menus.toml`.

Ajouter un bloc `[[main]]` avant l'entrée "Prendre rendez-vous" (qui doit rester en dernière position) :

```toml
[[main]]
  name = "Nom dans le menu"
  url = "/<slug>"
  weight = 65
```

Règles :

- `name` : texte affiché dans la barre de navigation.
- `url` : chemin absolu correspondant au nom du fichier dans `content/` (sans `.md`).
- `weight` : entier déterminant l'ordre d'affichage (ordre croissant). Incrémenter de 10 par rapport au dernier élément existant. L'entrée "Prendre rendez-vous" a le weight 70, donc ne pas dépasser 69 pour une nouvelle entrée.

État actuel du menu (poids existants) :

| Nom | URL | Weight |
|---|---|---|
| Accueil | / | 10 |
| Soins corps | /soins-corps | 20 |
| Visage | /visage | 30 |
| Épilations | /epilations | 40 |
| Beauté du regard | /beaute-du-regard | 50 |
| Onglerie | /onglerie | 60 |
| Prendre rendez-vous | /rendez-vous | 70 |

Pour insérer une nouvelle prestation entre Onglerie (60) et Prendre rendez-vous (70), utiliser weight = 65.

Note : L'entrée "Prendre rendez-vous" est rendue automatiquement comme un bouton vert par `layouts/partials/navbar.html`. Ne pas modifier son `name` ni son `url`.

### 1e. Ajouter la carte dans la grille de la page d'accueil

Éditer `data/prestations.json`.

Ajouter un objet dans le tableau `prestations` :

```json
{
  "title": "Nom de la prestation",
  "image": "nom-de-la-prestation-paysage.jpg",
  "description": "Courte description affichée sur la carte (1 à 2 phrases).",
  "button": "Découvrez [nom de la prestation]",
  "buttonLink": "/<slug>"
}
```

Règles :

- `image` : utiliser l'image au format paysage (suffixe `-paysage.jpg`), qui sera recadrée en 800x900 par Hugo.
- `button` : texte du bouton call-to-action, commencer par "Découvrez".
- `buttonLink` : chemin absolu identique à l'URL du menu.
- L'ordre dans le tableau correspond à l'ordre d'affichage dans la grille.

---

## 2. Modifier les couleurs du site

Éditer `config/_default/params.toml`.

Le fichier contient une section `[theme]` avec tous les tokens de couleur :

```toml
[theme]
  primary = "#6BDDB0"
  primary_light = "#DDF7EC"
  primary_dark = "#00C27B"

  background_default = "#FDFBF7"
  background_paper = "#F4F0E6"

  text_main = "#3D3D3D"
  text_muted = "#71717A"

  button_bg = "#3D3D3D"
  button_text = "#FFFFFF"
```

Changer la valeur d'un token suffit : Hugo lit ce fichier au build et le bridge JavaScript dans `layouts/_default/baseof.html` injecte automatiquement les valeurs comme variables CSS utilisées par Tailwind. Aucune autre modification n'est nécessaire.

Liste des tokens et leur rôle :

| Token | Role |
|---|---|
| `primary` | Couleur principale (accents, soulignements, séparateurs) |
| `primary_light` | Variante claire (fonds de sections, hover léger) |
| `primary_dark` | Variante foncée (hover bouton CTA vert) |
| `background_default` | Fond général des pages (crème) |
| `background_paper` | Fond alternatif (sections légèrement contrastées) |
| `text_main` | Couleur du texte principal |
| `text_muted` | Couleur du texte secondaire, descriptions atténuées |
| `button_bg` | Fond du bouton principal (noir/anthracite par défaut) |
| `button_text` | Couleur du texte du bouton principal |

Règle absolue : ne jamais hardcoder de couleurs hexadécimales directement dans les templates HTML. Toujours utiliser les classes Tailwind qui font référence aux tokens (`text-primary`, `bg-background-default`, etc.).

---

## 3. Modifier la navigation

Éditer `config/_default/menus.toml`.

Chaque entrée de menu suit cette structure :

```toml
[[main]]
  name = "Texte affiché"
  url = "/chemin"
  weight = 10
```

Règles :

- `weight` détermine l'ordre d'affichage dans la navbar : les valeurs les plus basses apparaissent en premier (gauche).
- Pour réordonner les entrées, modifier les valeurs de `weight` en conservant des incréments de 10 entre chaque entrée.
- Pour renommer une entrée, modifier uniquement le champ `name`.
- Pour changer l'URL d'une entrée, modifier le champ `url` et s'assurer que le fichier `content/<slug>.md` correspondant existe.
- Pour supprimer une entrée, retirer le bloc `[[main]]` complet.

Cas particulier — le bouton "Prendre rendez-vous" :

Le template `layouts/partials/navbar.html` identifie cette entrée par son nom exact `"Prendre rendez-vous"` pour lui appliquer un style de bouton vert distinct. Si le nom est modifié, le style de bouton ne s'appliquera plus. Conserver ce nom ou mettre à jour le template en conséquence.

---

## 4. Modifier les offres exclusives

Éditer `data/offre-exclusive.json`.

Structure du fichier :

```json
{
  "title": "Titre de la section (affiché en en-tête)",
  "offers": [
    {
      "title": "Nom de l'offre",
      "description": "Description affichée sous le titre",
      "price": 98,
      "price_discount": 20
    }
  ]
}
```

Comportement selon les valeurs de `price` et `price_discount` :

| `price` | `price_discount` | Rendu |
|---|---|---|
| `0` | `0` | En-tête ou note textuelle (la description est affichée sans bloc prix) |
| > 0 | `0` | Prix normal affiché |
| > 0 | > 0 | Ancien prix barré (`price`) + nouveau prix calculé (`price - price_discount`) |

Règles :

- `price_discount` représente la **remise en euros** (pas le prix final). Le template calcule automatiquement `price - price_discount` pour afficher le nouveau prix.
- Pour ajouter une offre, insérer un objet dans le tableau `offers`.
- Pour créer un groupe avec un titre descriptif, insérer un objet avec `price: 0` et `price_discount: 0` : seule la `description` est affichée (sert de chapeau ou de note).
- Pour retirer une offre, supprimer l'objet correspondant dans le tableau.
- `title` à la racine du fichier est le titre de la section tel qu'il apparaît sur la page d'accueil (actuellement "Nouveautés").

---

## 5. Conventions du projet

### Formatage du code

Le projet utilise Prettier. La configuration est dans `.prettierrc` à la racine.

Paramètres actifs :

| Paramètre | Valeur |
|---|---|
| `printWidth` | 120 |
| `tabWidth` | 2 |
| `useTabs` | false |
| `semi` | true |
| `singleQuote` | false |
| `trailingComma` | none (pas de virgule après le dernier élément) |

Avant tout commit, formater les fichiers modifiés :

```bash
npx prettier --write <fichier>
```

Ou tous les fichiers du projet :

```bash
npx prettier --write .
```

### Commits

Utiliser les commits conventionnels. Le format est : `<type>: <description en minuscules>`.

Types courants :

| Type | Usage |
|---|---|
| `feat` | Ajout d'une nouvelle fonctionnalité ou page |
| `fix` | Correction d'un bug |
| `docs` | Modification de la documentation uniquement |
| `style` | Changement de style ou de mise en forme (sans impact fonctionnel) |
| `refactor` | Restructuration du code sans changement de comportement |

Exemples valides :

```
feat: ajout de la page onglerie
fix: correction du prix manquant dans epilation.json
docs: mise à jour du guide de contribution
style: ajout des marges sur la grille services
```

### Nommage des images

- Minuscules uniquement.
- Mots séparés par des tirets `-`.
- Pas d'accents, pas d'espaces, pas de caractères spéciaux.
- Suffixe obligatoire : `-portrait` ou `-paysage` selon l'orientation.
- Extension : `.jpg` uniquement.

Exemples valides : `soin-visage-portrait.jpg`, `onglerie-paysage.jpg`.

Exemples invalides : `Soin Visage.jpg`, `soin_visage_portrait.jpg`, `SoinVisagePortrait.JPG`.

### Traitements d'images Hugo

Hugo redimensionne et recadre les images automatiquement au build. Le recadrage est centré dans tous les cas.

| Contexte d'utilisation | Dimensions de sortie |
|---|---|
| Grille services (page d'accueil) | 800 x 900 px |
| Cartes d'univers (layout complex) | 600 x 600 px |
| Portrait page de prestation (layout simple) | 800 x 1066 px |
| Carousel hero (page d'accueil) | Aucun redimensionnement |
| Logo | Aucun redimensionnement |

Fournir des images sources avec une résolution au moins deux fois supérieure aux dimensions de sortie pour garantir la qualité sur les écrans haute densité (Retina).
