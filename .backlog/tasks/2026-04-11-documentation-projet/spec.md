# Specs - Documentation Projet Source d'Anahata

## Objectif

Creer une documentation essentielle du projet dans un dossier `docs/` avec plusieurs fichiers thematiques. Enrichir `CLAUDE.md` avec les regles de collaboration et un renvoi vers la documentation.

## Perimetre

### 1. Dossier `docs/` (nouveau)

**docs/README.md** - Point d'entree de la documentation
- Presentation du projet (institut, site vitrine, URL)
- Stack technique (Hugo, Tailwind, Congo theme)
- Liens vers les autres fichiers de doc

**docs/architecture.md** - Structure du projet
- Arborescence des dossiers avec description de chaque dossier
- Flux de donnees : content/*.md → data/*.json → layouts/*.html
- Systeme de layouts (simple vs complex)
- Systeme de couleurs (tokens Tailwind depuis params.toml)

**docs/contenu.md** - Guide du contenu
- Liste des pages et leur correspondance data
- Modeles de donnees JSON (simple et complex)
- Liste des fichiers de donnees et leur role

**docs/guide-contribution.md** - Comment modifier le site
- Comment ajouter une nouvelle prestation (page + JSON + menu + image)
- Comment modifier les couleurs
- Comment modifier la navigation
- Comment modifier les offres exclusives
- Conventions (Prettier, commits, nommage images)

### 2. Modification de `CLAUDE.md`

- Ajouter une section `## Regles de collaboration` avec les 2 regles
- Ajouter une reference vers `docs/` dans la section existante

### 3. Hors perimetre

- Pas de refactoring de code
- Pas de correction du typo "insitut-presentation.json"
- Pas de documentation du theme Congo (non utilise)
- Pas de documentation des fichiers .backlog/.claude/.audit (internes agent-factory)

## Fichiers impactes

| Fichier | Action |
|---------|--------|
| `docs/README.md` | Creation |
| `docs/architecture.md` | Creation |
| `docs/contenu.md` | Creation |
| `docs/guide-contribution.md` | Creation |
| `CLAUDE.md` | Modification (ajout section regles + reference docs) |

## Criteres de validation

- La doc est lisible par un humain sans connaissance prealable du projet
- La doc est suffisamment structuree pour qu'une IA puisse s'en servir comme reference
- Les regles de collaboration sont claires et visibles dans CLAUDE.md
- Niveau de detail : essentiel (pas de dump exhaustif de chaque template)
