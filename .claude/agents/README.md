# Agents personnalises

Ce dossier contient les agents specifiques au projet qui surchargent les agents par defaut.

## Resolution des agents (3 niveaux)

1. **Projet** (`.claude/agents/`) - Priorite la plus haute
2. **Direction** - Agents partages par direction
3. **Commons** (plugin agent-factory) - Agents par defaut

## Ajouter un agent

Utiliser la commande `/agent-factory:add-agent` pour :
- Copier un agent existant depuis le plugin et le personnaliser
- Creer un agent entierement nouveau

## Format

Chaque agent est un fichier `.md` avec frontmatter YAML contenant :
- `name` : Nom de l'agent
- `description` : Description courte
- `model` : Modele a utiliser (optionnel)
- Corps : Instructions de l'agent
