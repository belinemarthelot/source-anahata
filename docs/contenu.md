# Contenu du site Source d'Anahata

## Pages et correspondances data

| Page | Fichier content | Fichier data | Layout |
|------|----------------|--------------|--------|
| Accueil | content/_index.md | insitut-presentation.json, prestations.json, offre-exclusive.json | index.html |
| Soins corps | content/soins-corps.md | data/soin-corps.json | prestation (complex) |
| Visage | content/visage.md | data/soin-visage.json | prestation (complex) |
| Epilations | content/epilations.md | data/epilation.json | prestation (simple) |
| Beaute du regard | content/beaute-du-regard.md | data/beaute-du-regard.json | prestation (simple) |
| Onglerie | content/onglerie.md | data/onglerie.json | prestation (simple) |
| Rendez-vous | content/rendez-vous.md | - | rendez-vous |

## Frontmatter des pages prestation

```yaml
---
title: "Titre"
data_file: "nom-du-fichier-json-sans-extension"
layout: "prestation"
---
Texte d'introduction optionnel.
```

Le champ `data_file` indique le fichier JSON dans `data/` a charger (sans l'extension `.json`).

## Modeles de donnees JSON

### Schema simple

Utilise pour : `beaute-du-regard.json`, `epilation.json`, `onglerie.json`

```json
{
  "title": "Titre de la page",
  "layout": "simple",
  "images": ["image-portrait.jpg"],
  "prestations": [
    { "title": "Nom", "description": "Duree et details", "price": "XX" }
  ]
}
```

### Schema complex

Utilise pour : `soin-corps.json`, `soin-visage.json`

```json
{
  "title": "Titre",
  "layout": "complex",
  "images": ["image.jpg"],
  "univers": [
    {
      "name": "Nom univers",
      "description": "Description",
      "image": "image.jpg",
      "prestations": [
        { "title": "Nom", "description": "Details", "price": "XX", "options": [] }
      ]
    }
  ]
}
```

Notes sur les valeurs de `price` :
- Valeur numerique normale : prix en euros affiches
- `""` (chaine vide) : ligne informative sans prix
- `0` : header de section (titre de groupe sans prix)

Note sur `options[]` : champ optionnel, utilise pour les supplements tarifaires (presente dans `soin-visage.json`).

## Fichiers data de la homepage

| Fichier | Role |
|---------|------|
| `insitut-presentation.json` | Texte de presentation de l'institut et images du carousel hero (note : typo conservee dans le nom de fichier) |
| `prestations.json` | Grille de 5 cartes de services avec liens vers les pages prestation |
| `offre-exclusive.json` | Offres du moment et nouveautes affichees en page d'accueil |
| `offre-exclusive_old.json` | Archive des anciennes offres (non utilise, ne pas modifier) |

## Detail des fichiers complex

### soin-corps.json

5 univers : Le Ressourcant, L'Eveil d'Agnisia, Rituels du Monde, Maderosport, Les Essentiels.

### soin-visage.json

3 univers : Magic Face, Phyt's Bio, Biodroga.
Utilise `options[]` dans les prestations pour les supplements.

## Detail des fichiers simples

| Fichier | Nombre de prestations |
|---------|-----------------------|
| `epilation.json` | 14 |
| `beaute-du-regard.json` | 5 |
| `onglerie.json` | 7 |
