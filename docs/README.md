# Documentation - Source d'Anahata

## Presentation du projet

Source d'Anahata est un institut de bien-etre situe a Prenois (21370), fonde par Beline.
Ce depot contient le site vitrine de l'institut, accessible a l'adresse :

**https://institut-source-anahata.fr**

Le site presente les soins et prestations de l'institut et permet aux clientes de prendre
rendez-vous via un widget de reservation en ligne (Planity).

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Generateur de site | Hugo (SSG) |
| Templates | Go templates Hugo |
| CSS | Tailwind CSS (CDN, pas de build) |
| Contenu | Markdown avec frontmatter YAML |
| Donnees | Fichiers JSON dans `data/` |
| Polices | Google Fonts - Cardo (serif) |
| Formatage | Prettier |

**Note sur le theme Congo** : un submodule git `themes/congo/` est present dans le depot,
mais le theme n'est pas actif. Tous les layouts sont definis localement dans `layouts/`.

## Prerequis

- **Hugo** installe en local (version extended recommandee)
- **Git** avec support des submodules

Lors du premier clone :

```bash
git clone --recurse-submodules <url-du-repo>
```

Si le depot a deja ete clone sans les submodules :

```bash
git submodule update --init --recursive
```

## Lancer le site en local

```bash
hugo server
```

Le site est accessible sur http://localhost:1313 avec rechargement automatique.

## Pages du site

Le site contient 7 pages principales :

- Accueil
- Soins corps
- Soins visage
- Epilations
- Beaute du regard
- Onglerie
- Prendre rendez-vous

## Documentation complementaire

| Fichier | Contenu |
|---------|---------|
| [architecture.md](./architecture.md) | Structure des dossiers, flux de donnees, systeme de layouts |
| [contenu.md](./contenu.md) | Pages, fichiers JSON, modeles de donnees |
| [guide-contribution.md](./guide-contribution.md) | Comment modifier le site (prestations, couleurs, navigation) |
