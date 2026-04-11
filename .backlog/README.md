# Backlog - Source d'Anahata

Architecture centree sur les taches. Chaque tache ou bug est un sous-dossier complet et horodate.

## Structure

```
.backlog/
  tasks/          # Taches en cours et terminees
  bugs/
    active/       # Bugs actifs
    resolved/     # Bugs resolus
  ideas/
    pending/      # Idees en attente
    converted/    # Idees converties en taches
    rejected/     # Idees rejetees
  imports/        # Fichiers d'import externes (Jira, CSV, etc.)
```

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `/agent-factory:task <desc>` | Workflow complet (7 phases) |
| `/agent-factory:task-quick <desc>` | Workflow simplifie |
| `/agent-factory:task-resume` | Reprendre une tache interrompue |
| `/agent-factory:task-status` | Statut d'une tache |
| `/agent-factory:debug <desc>` | Debugger un probleme |
| `/agent-factory:idea <desc>` | Capturer une idee |
| `/agent-factory:audit` | Audit technique |
| `/agent-factory:review` | Revue de code |
| `/agent-factory:remediate` | Remediation depuis audit |
