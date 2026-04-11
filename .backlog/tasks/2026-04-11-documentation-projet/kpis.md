# KPIs: Documentation Projet Source d'Anahata

## Poker Planning
- **Date**: 2026-04-11
- **Initial estimate**: 2h30
- **Complexity**: S
- **Confidence**: 5 - Perimetre tres bien defini, projet de taille modeste (6 pages, 9 fichiers data, 12 layouts), aucune dependance technique, tout est de la redaction documentaire pure.

## Breakdown by Component

| Component | Estimate | Risks |
|-----------|----------|-------|
| docs/README.md | 20min | Faible - contenu connu (stack, URL, liens) |
| docs/architecture.md | 40min | Faible - structure visible, flux clair |
| docs/contenu.md | 35min | Faible - liste pages + data deja inventoriee |
| docs/guide-contribution.md | 45min | Moyen - necessite de comprendre chaque workflow metier |
| CLAUDE.md (modification) | 10min | Faible - ajout de sections, pas de refonte |

## Time Types (IMPORTANT)

| Type | Description | Value |
|------|-------------|-------|
| **Agent time** | Somme des estimations (sequentiel) | 2h30 |
| **Parallel time** | Avec parallelisation (gain ~40%) | 1h30 |
| **Prompt time** | Temps reel observe (a remplir) | - |

## Identified Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Contenu trop exhaustif vs "essentiel" | M | M | Respecter le critere de validation : essentiel, pas de dump de templates |
| Erreur de comprehension du flux data | L | M | Lire quelques fichiers JSON et layouts avant d'ecrire |
| Typo "insitut-presentation.json" a ne pas corriger | L | L | Hors perimetre explicitement note dans les specs |

## Task Tracking

| ID | Task | Agent | Mode | Wave | Estimated | Prompt | Status |
|----|------|-------|------|------|-----------|--------|--------|
| T1 | docs/README.md | developer | Task | V1 | 20min | - | ⏳ |
| T2 | docs/architecture.md | developer | Task | V1 | 40min | - | ⏳ |
| T3 | docs/contenu.md | developer | Task | V1 | 35min | - | ⏳ |
| T4 | docs/guide-contribution.md | developer | Task | V1 | 45min | - | ⏳ |
| T5 | CLAUDE.md - ajout regles + ref docs | developer | Task | V2 | 10min | - | ⏳ |

**Mode**: All tasks use Task (subagent) to guarantee guideline application.

## Global Metrics

- **Tasks completed**: 0/5 (0%)
- **Waves completed**: 0/2 (0%)
- **QA bugs**: 0
- **Review corrections**: 0

## Subagent Metrics

- **Subagent ratio**: 0% (target: 100%)
- **Task tasks**: 0
- **Compactions**: 0

## Landing

- **ETA**: After planning
- **Status**: Awaiting planning
