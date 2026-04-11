# Retrospective: Documentation Projet Source d'Anahata

## Resume executif

| Metrique | Estime | Reel | Ecart |
|----------|--------|------|-------|
| Temps total (parallelise) | 1h30 | Non mesure (prompt time non rempli) | - |
| Taches | 5 | 5 | 0% |
| Bugs QA | 0 | 0 | - |
| Corrections Review (HIGH) | 0 | 2 | +2 |
| Iterations QA | 1 | 1 | - |
| Iterations Review | 1 | 1 (+ correction manuelle) | - |

**Statut final**: TERMINE (avec corrections post-review)

---

## Metriques finales

### Execution

| Phase | Estime | Statut |
|-------|--------|--------|
| Exploration | - | Termine - 4 agents paralleles |
| Specs | - | Termine - validees utilisateur |
| Poker Planning | - | Termine |
| Planning | - | Termine - 2 waves, 5 taches |
| Implementation W1 | 1h40 (4 taches paralleles) | Termine |
| Implementation W2 | 10min (1 tache) | Termine |
| QA | - | ACCEPTED (1 iteration) |
| Review | - | CHANGES REQUIRED -> corrige |
| **Total** | **1h30 (parallelise)** | **Prompt time non saisi** |

Note: le champ "Prompt time" n'a pas ete rempli dans le suivi KPIs, rendant la mesure du gain reel impossible. Voir actions correctives.

### Qualite

| Metrique | Valeur |
|----------|--------|
| Bugs bloquants trouves en QA | 0 |
| Observations mineures QA | 3 |
| Corrections HIGH requises en Review | 2 |
| Corrections MEDIUM requises en Review | 1 |
| Corrections LOW requises en Review | 2 |
| Suggestions optionnelles Review | 3 |
| Corrections appliquees (manuelle orchestrateur) | 2 (HIGH uniquement) |
| Iterations QA | 1 |
| Iterations Review | 1 |

### Parallelisation

| Wave | Taches paralleles | Mode |
|------|-------------------|------|
| V1 | 4 (T1, T2, T3, T4) | Subagents paralleles |
| V2 | 1 (T5) | Subagent sequentiel |

Gain theorique V1 : ~75% par rapport a une execution sequentielle (4 taches sur le chemin critique).

### Subagents

| Metrique | Valeur | Objectif |
|----------|--------|----------|
| Total subagents lances | 12 | - |
| Subagents reussis | 12 | - |
| Subagents echoues | 0 | - |
| Ratio de reussite | 100% | 100% |
| Taches via Task() | 5/5 | 100% |
| Ratio subagent | 100% | 100% |
| Compactions detectees | 0 | 0 |

---

## Ce qui a bien fonctionne

### Par agent

| Agent | Points positifs |
|-------|-----------------|
| Exploration | Analyse complete en 4 agents paralleles (config, content, layouts, assets) |
| Specs | Perimetre tres bien defini, valide par l'utilisateur sans iteration |
| Poker Planning | Confiance 5/5 justifiee : complexite S correctement estimee, aucune surprise technique |
| Developer (W1) | 4 fichiers produits en parallele, tous acceptes en QA premiere iteration |
| Developer (W2) | Modification CLAUDE.md propre, sections bien inserees |
| QA | Verification exhaustive des 10 criteres d'acceptance, zero faux positif, observations mineures pertinentes |
| Review | Detection precise des erreurs HIGH sur les noms de classes Tailwind, suggestions optionnelles de qualite |

### Par phase

1. **Specs** : Perimetre clair et actionnable. Le critere "essentiel, pas de dump de templates" a ete respecte par tous les agents developer.
2. **Implementation** : La parallelisation V1 (4 agents) a fonctionne sans conflit car les 4 fichiers sont independants. Aucune dependance inter-taches.
3. **QA** : Premiere iteration directement ACCEPTED. Le QA a identifie l'incoherence token tirets/underscores comme observation mineure - point que le Review a ensuite eleve en HIGH, ce qui montre une bonne couverture a deux niveaux.
4. **Subagents** : 12 lances, 12 reussis, 0 compaction. Pipeline propre.

---

## Ce qui peut etre ameliore

### Par agent

| Agent | Probleme | Action |
|-------|----------|--------|
| Developer | Confusion entre notation `params.toml` (underscores) et classes Tailwind (tirets) dans `architecture.md`. Le developer a produit une table qui melange les deux espaces de nommage sans les distinguer. | Ajouter dans le prompt developer une instruction explicite : "verifier les noms de classes reels dans les layouts avant de documenter les tokens CSS" |
| QA | L'incoherence sur les noms de classes Tailwind a ete detectee comme observation mineure (non bloquante) alors que le Review l'a classee HIGH. Sous-evaluation de la severite. | Le QA doit tester la consequence pratique d'une erreur de documentation : "si un agent utilise cette info, produit-il du code incorrect ?" - si oui, c'est bloquant |
| Orchestrateur | Le "Prompt time" n'a jamais ete renseigne dans kpis.md, rendant le calcul de velocite impossible. | Renseigner le prompt time apres chaque wave, meme approximativement |

### Par phase

| Phase | Probleme | Solution |
|-------|----------|----------|
| Implementation | Verification insuffisante des donnees techniques avant redaction (noms de classes Tailwind non verifies dans les vrais templates) | Ajouter une etape de verification dans le prompt : "lire les templates concernes avant de documenter les classes CSS" |
| Review | 2 corrections HIGH appliquees manuellement par l'orchestrateur sans passer par un nouveau cycle QA | Apres corrections post-review, toujours relancer un QA cible sur les points corriges |
| KPIs | Prompt time non saisi - suivi de velocite inexploitable | Discipline de saisie obligatoire apres chaque wave |

---

## Bugs / Patterns recurrents

| Pattern | Occurrences | Cause racine | Prevention |
|---------|-------------|--------------|------------|
| Confusion notation params.toml vs classes Tailwind | 1 (dans architecture.md) | Le developer a documente les tokens conceptuellement sans verifier les noms reels dans le HTML | Ajouter instruction explicite dans le prompt : grep des classes reelles dans les layouts avant redaction |
| Prompt time non renseigne | 1 feature complete | Oubli de saisie apres les waves | Ajouter le remplissage du prompt time comme etape obligatoire dans le workflow de chaque wave |

---

## Actions pour les prochaines features

### Haute priorite
- [ ] Ajouter dans les prompts de documentation technique : "avant de documenter une valeur (nom de classe, configuration), verifier sa valeur reelle dans les fichiers sources"
- [ ] Renseigner le prompt time dans kpis.md apres chaque wave (meme estimation grossiere en minutes)
- [ ] Apres corrections post-review, relancer un QA cible sur les sections modifiees avant de clore la feature

### Priorite moyenne
- [ ] Harmoniser le niveau de severite QA / Review : le QA devrait evaluer l'impact pratique d'une erreur ("un agent l'utilisant produirait-il du code incorrect ?") pour aligner son verdict avec celui du Review
- [ ] Appliquer les corrections LOW et MEDIUM du Review dans la meme passe que les HIGH, pas seulement les corrections bloquantes

### Priorite basse
- [ ] Completer les 3 suggestions optionnelles du Review dans une prochaine passe de maintenance de la doc : note sur `soinvisage-portrait.jpg` dans soin-corps, carousel sans redimensionnement dans architecture.md, price string dans schema complex

---

## Notes pour les agents

### Pour les developers
- Lors de la documentation de noms de classes CSS / Tailwind, toujours grep les fichiers de layouts correspondants pour verifier les noms reels. Ne pas inferer le nom de classe depuis le nom du token.
- La distinction entre le nom du parametre (params.toml, underscores) et le nom de la classe Tailwind (tirets, parfois abreviations comme `btn`) est systematiquement une source d'erreur.

### Pour le QA
- Evaluer la severite d'une incoherence documentaire en fonction de son impact pratique : "si un agent ou contributeur suit cette doc, produit-il un resultat incorrect ?" Si oui, la severite est au minimum MEDIUM, potentiellement HIGH.
- Ne pas classer en "observation mineure non bloquante" des erreurs qui produiraient du code non fonctionnel.

### Pour l'orchestrateur
- **PROMPT TIME** : renseigner le champ dans kpis.md apres chaque wave. Sans cela, la retrospective ne peut pas calculer la velocite reelle.
- **POST-REVIEW** : si des corrections sont appliquees manuellement, documenter precisement quels fichiers et quelles lignes ont ete modifies, et relancer un QA cible.
- **SUBAGENTS** : maintenir la discipline 100% Task() - cette feature en est un bon exemple (12/12 reussis, 0 compaction).

---

## Conclusion

La feature documentation-projet a atteint son objectif : 5 fichiers crees, couvrant l'ensemble du perimetre, acceptes en QA premiere iteration. Le pipeline subagent a fonctionne de facon optimale (12/12, 0 compaction, 100% Task).

Le seul point de friction est apparu en Review avec 2 corrections HIGH sur les noms de classes Tailwind dans `architecture.md` - un type d'erreur evitable si les agents verifiaient les valeurs reelles dans les sources avant de les documenter.

Pour les prochaines features documentaires, la lecon principale est : **la documentation technique doit etre derivee des sources, pas inferee depuis les conventions**. Un grep sur les templates avant d'ecrire la doc aurait evite les 2 corrections HIGH.

La non-saisie du prompt time reste le seul point de process a corriger systematiquement pour rendre les retrospectives metriquement exploitables.
