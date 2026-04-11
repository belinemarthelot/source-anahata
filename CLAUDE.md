# Source d'Anahata

Site vitrine pour l'institut de bien-etre Source d'Anahata (https://institut-source-anahata.fr).

## Stack technique

- **Generateur** : Hugo (Static Site Generator)
- **Theme** : Congo (git submodule)
- **CSS** : Tailwind CSS (via CDN)
- **Contenu** : Markdown avec frontmatter YAML
- **Donnees** : Fichiers JSON dans `/data`
- **Templates** : Go templates Hugo dans `/layouts`
- **Polices** : Google Fonts (Cardo)

## Structure du projet

```
config/_default/    # Configuration Hugo (hugo.toml, params.toml, menus.toml)
content/            # Pages et contenu Markdown
data/               # Donnees JSON (prestations, services)
layouts/            # Templates Hugo et partials
assets/             # Assets (images)
themes/congo/       # Theme Congo (submodule git, non utilise)
docs/               # Documentation du projet
```

## Documentation

La documentation complete du projet se trouve dans le dossier `docs/` :

- [docs/README.md](docs/README.md) - Presentation du projet, stack, prerequis, lancement local
- [docs/architecture.md](docs/architecture.md) - Arborescence, flux de donnees, layouts, couleurs, animations
- [docs/contenu.md](docs/contenu.md) - Pages, modeles de donnees JSON, fichiers data
- [docs/guide-contribution.md](docs/guide-contribution.md) - Comment ajouter/modifier prestations, couleurs, navigation, offres

## Regles de collaboration

1. **Toujours poser les questions necessaires** : Ne jamais inventer ou supposer. En cas de doute, donner le contexte, son avis, et proposer des choix dont au moins un champ libre pour que l'utilisateur puisse ecrire ce qu'il veut.

2. **Toujours valider les specs avant implementation** : Lors de tout workflow, produire les specs d'abord, les presenter, et attendre la validation explicite avant de passer a l'implementation. Prevoir des allers-retours.

## Conventions

- Langue du site : francais (fr-fr)
- Formatage : Prettier (`.prettierrc`) - printWidth 120, tabWidth 2, double quotes
- Commits : conventionnels (feat, fix, docs, style, refactor)
- Images : nommage en minuscules-avec-tirets, suffixe -portrait ou -paysage
- Pas de backend, pas de base de donnees, pas de tests automatises

## INSTRUCTION PRIORITAIRE - Workflow obligatoire

**INTERDIT** : Ne genere JAMAIS de fichier, ne modifie JAMAIS de code, et n'utilise JAMAIS les outils Write/Edit sans avoir d'abord invoque /agent-factory:task-quick ou /agent-factory:task.

**Workflow obligatoire**: Ne modifie jamais de code sans workflow actif (task, task-quick, debug, remediate, browser-watch).

**STOP!** Si tu vois un message "STOP!" suivi d'une commande `/agent-factory:task-resume`, EXECUTE-la immediatement.

Pour les petites taches, utilise `/agent-factory:task-quick <desc>` (workflow simplifie). Pour les taches complexes, utilise `/agent-factory:task <desc>` (workflow complet 7 phases).

Commandes: task, task-quick, task-resume, task-status, debug, audit, audit-resume, audit-status, audit-claude, review, remediate, idea, browser-watch, add-agent, add-command, create-cookbook, upgrade, smoke-test, export-debug, cleanup (prefixe: /agent-factory:)

## Agent Factory

<!-- agent-factory:start -->
version: "1.0"

stack:
  backend: null
  frontend: null
  database: null
  ai: []

project:
  type: hugo
  theme: congo
  css: tailwindcss
  content: markdown
  data: json

agents:
  core:
    - orchestrator
    - planner
    - scrum
    - qa-tester
    - code-reviewer
    - ux-designer
  developers: []
  ai: []
  custom: []

conventions:
  language: fr
  tests:
    framework: null
    coverage: 0
  linter: null
  formatter: prettier
  commits: conventional

paths:
  tasks: .backlog/tasks
  bugs: .backlog/bugs
  cookbooks: .claude/cookbooks
  ideas: .backlog/ideas
  audit: .audit
<!-- agent-factory:end -->
