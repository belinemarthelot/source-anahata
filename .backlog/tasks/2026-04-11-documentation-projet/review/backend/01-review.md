# Documentation Review: documentation-projet

## Summary

- **Status**: CHANGES REQUIRED
- **Date**: 2026-04-11
- **Reviewer**: code-reviewer

---

## Reviewed Files

| Fichier | Score |
|---------|-------|
| `docs/README.md` | A |
| `docs/architecture.md` | B |
| `docs/contenu.md` | B |
| `docs/guide-contribution.md` | A |
| `CLAUDE.md` | B |

### Score
- **A**: Excellent
- **B**: Bon, ameliorations mineures
- **C**: Acceptable, ameliorations souhaitables
- **D**: Problemes a corriger

---

## Points positifs

### Completude
- Tous les fichiers prevus par les specs sont presents et couvrent l'ensemble du perimetre.
- `docs/guide-contribution.md` est le document le plus complet et le plus actionnable : les 5 sections (ajouter une prestation, modifier couleurs, navigation, offres exclusives, conventions) sont toutes presentes avec des exemples concrets.
- La note sur la typo `insitut-presentation.json` est presente dans `docs/contenu.md` et `docs/architecture.md` : c'est une information critique correctement documentee.
- `CLAUDE.md` a bien ete enrichi avec la section `## Regles de collaboration` et le renvoi vers `docs/`.

### Lisibilite
- Les tableaux de synthese (pages/data, fichiers data homepage, menu avec weights) facilitent la consultation rapide.
- Le flux de donnees en `docs/architecture.md` (diagramme ASCII) est clair et educatif.
- Les schemas JSON avec les valeurs speciales de `price` (0, vide, numerique) sont bien documentes.

### AI-readability
- La documentation est suffisamment structuree pour servir de reference a un agent : les contraintes techniques (pas de static/, CSS inline, Tailwind CDN, pas de build) sont explicites.
- La regle absolue sur les couleurs est presente dans deux documents (`architecture.md` et `guide-contribution.md`), ce qui renforce sa visibilite.

---

## Changements requis

### 1. Inexactitude sur les tokens Tailwind dans `docs/architecture.md`

**Priorite**: HIGH
**Fichier**: `docs/architecture.md` ligne 97-103

**Probleme**: La table des tokens de couleur utilise des noms avec des tirets (`primary-light`, `background-paper`, `text-main`, `button-bg`, `button-text`). Ce n'est pas ce que le bridge JS expose reellement. Dans `baseof.html`, le mapping Tailwind cree les tokens suivants :

- `primary.DEFAULT`, `primary.light`, `primary.dark` → classes `bg-primary`, `bg-primary-light`, `bg-primary-dark`
- `background.default`, `background.paper` → classes `bg-background-default`, `bg-background-paper`
- `text.main`, `text.muted` → classes `text-text-main`, `text-text-muted`
- `btn.bg`, `btn.text` → classes `bg-btn-bg`, `text-btn-text` (et NON `button-bg` / `button-text`)

La table dans `architecture.md` melange le nom du token `params.toml` (avec underscores : `button_bg`) et le nom de classe Tailwind suppose (avec tirets : `button-bg`). Les classes reelles utilisees dans les templates sont `bg-btn-bg` et `text-btn-text`, ce qui est different de ce que la doc indique.

Verification dans les templates :
```
layouts/partials/prestations/layout-simple.html:39:  class="... bg-btn-bg text-btn-text ..."
layouts/partials/home/exclusivity.html:87:  class="bg-btn-bg text-btn-text ..."
```

**Solution suggeree**: Mettre a jour la table des tokens dans `docs/architecture.md` pour refleter les noms de classes Tailwind reels, et faire de meme dans `docs/guide-contribution.md` section 2 qui mentionne `text-primary`, `bg-background-default` (ceux-la sont corrects) mais il faut verifier la coherence globale :

```markdown
| Token params.toml | Classe Tailwind | Valeur |
|---|---|---|
| `primary` | `bg-primary` / `text-primary` | `#6BDDB0` |
| `primary_light` | `bg-primary-light` | `#DDF7EC` |
| `primary_dark` | `bg-primary-dark` | `#00C27B` |
| `background_default` | `bg-background-default` | `#FDFBF7` |
| `background_paper` | `bg-background-paper` | `#F4F0E6` |
| `text_main` | `text-text-main` | `#3D3D3D` |
| `text_muted` | `text-text-muted` | `#71717A` |
| `button_bg` | `bg-btn-bg` | `#3D3D3D` |
| `button_text` | `text-btn-text` | `#FFFFFF` |
```

**Justification**: Un developpeur ou un agent qui se base sur cette table pour ecrire du HTML utilisera des classes Tailwind incorrectes (`bg-button-bg` au lieu de `bg-btn-bg`), ce qui produira des styles non appliques. C'est une erreur bloquante pour l'utilisabilite de la doc.

---

### 2. Incoherence sur le token `background` dans `docs/architecture.md`

**Priorite**: HIGH
**Fichier**: `docs/architecture.md` ligne 103

**Probleme**: La phrase d'exemple cite `bg-background-paper` comme classe valide, mais la table deux lignes au-dessus indique le token comme `background` avec la valeur `#FDFBF7` (sans suffixe). Le token reel dans `params.toml` est `background_default` et la classe Tailwind correspondante est `bg-background-default`. La confusion entre `background` (inexistant) et `background-default` (reel) peut induire en erreur.

**Solution**: Corriger la table pour separer `background_default` et `background_paper` en deux lignes distinctes (ce qui est deja partiellement fait mais mal libelle), et s'assurer que l'exemple de classe cite dans le texte utilise `bg-background-default` et non une forme raccourcie inventee.

---

### 3. Nombre d'images incohrent dans `docs/architecture.md`

**Priorite**: LOW
**Fichier**: `docs/architecture.md` ligne 18

**Probleme**: La doc indique "17 fichiers JPEG (~64 MB)". Le listing reel de `assets/images/` montre 17 fichiers, donc le nombre est correct. Cependant, la taille "~64 MB" n'a pas ete verifiee et est susceptible de devenir obsolete rapidement. C'est une information marginale qui peut creer de la confusion.

**Solution**: Supprimer la mention de la taille en MB, ou la rendre approximative avec une note explicite que ce chiffre evolue :
```
assets/images/  # Images JPEG (portrait et paysage), traitees par le pipeline Hugo
```

---

### 4. Schema JSON "simple" : incoherence sur la valeur speciale `price: 0`

**Priorite**: MEDIUM
**Fichiers**: `docs/contenu.md` ligne 70, `docs/guide-contribution.md` ligne 81

**Probleme**: Dans `docs/contenu.md`, la documentation du schema simple indique :
- `""` (chaine vide) : ligne informative sans prix
- `0` : header de section (titre de groupe sans prix)

Mais dans `docs/guide-contribution.md` (section schema simple, regle sur `price`), il est ecrit :
> `price` : nombre entier (en euros) ou chaine vide `""` pour une ligne sans prix (note, en-tete).

La valeur `0` n'est pas mentionnee dans ce passage du guide de contribution pour le schema simple, ce qui est une omission. Elle est bien documentee pour le schema complex. La verification sur `epilation.json` confirme que le schema simple utilise `""` (pas `0`), donc `0` dans le schema simple est peut-etre absent en pratique mais la coherence entre les deux fichiers de doc devrait etre verifiee et explicitee.

**Solution**: Harmoniser les deux descriptions. Si `0` n'est pas utilise dans le schema simple en pratique, le retirer de `contenu.md` pour eviter la confusion. Si il peut l'etre, l'ajouter dans `guide-contribution.md`.

---

### 5. `CLAUDE.md` : mention du theme Congo ambigue

**Priorite**: LOW
**Fichier**: `CLAUDE.md` ligne 8

**Probleme**: La section Stack technique de `CLAUDE.md` indique `**Theme** : Congo (git submodule)` sans preciser qu'il n'est pas utilise. La section `## Documentation` renvoie vers `docs/README.md` qui, elle, clarifie le point. Mais un agent lisant uniquement `CLAUDE.md` pourrait supposer que Congo est actif et chercher des templates dans `themes/congo/`.

La section Agent Factory (gestion interne) indique egalement `theme: congo` dans le bloc YAML, ce qui renforce l'ambiguite.

**Solution**: Ajouter une note inline dans `CLAUDE.md` :
```markdown
- **Theme** : Congo (git submodule, non utilise - tous les layouts sont dans `layouts/`)
```

---

## Suggestions d'amelioration (optionnelles)

### 1. Documenter les valeurs reelles de `soinvisage-portrait.jpg` utilise dans `soin-corps.json`
- **Fichier**: `docs/contenu.md`
- **Suggestion**: Le fichier `soin-corps.json` utilise `soinvisage-portrait.jpg` comme image de l'univers Maderosport, ce qui est surprenant (nom de fichier visage pour un soin corps). Cela merite une note dans `contenu.md` pour eviter qu'un contributeur pense a une erreur et tente de corriger.
- **Benefice**: Evite des modifications involontaires du JSON.

### 2. `docs/architecture.md` : le carousel ne fait pas de redimensionnement
- **Fichier**: `docs/architecture.md` section "Points d'attention"
- **Suggestion**: La table des traitements d'images dans `guide-contribution.md` indique deja "Aucun redimensionnement" pour le carousel hero. Cette information n'est pas presente dans `architecture.md`. La coherence serait meilleure avec une mention dans la section Assets.
- **Benefice**: Un seul endroit de reference pour le comportement du carousel.

### 3. `docs/contenu.md` : le champ `options` de soin-visage utilise aussi un `price` string
- **Fichier**: `docs/contenu.md`
- **Suggestion**: Le schema complex documente `options[]` comme optionnel mais ne mentionne pas que `price` dans une prestation peut etre une chaine (ex: `"À partir de 100"` dans `soin-visage.json`). Ce cas reel pourrait surprendre un contributeur.
- **Benefice**: Schema plus fidele a la realite du projet.

---

## Checklist finale

### Exactitude
- [x] Pages et fichiers content correspondent aux fichiers reels
- [x] Fichiers data listes correspondent aux fichiers reels
- [x] Menu documente correspond a `menus.toml` reel
- [x] Configuration Prettier correspond a `.prettierrc` reel
- [x] Valeurs des tokens de couleur correspondent a `params.toml` reel
- [ ] Noms de classes Tailwind dans `architecture.md` incorrects (`button-bg` au lieu de `btn-bg`)
- [ ] Table des tokens `architecture.md` ne distingue pas token-params vs classe-Tailwind

### Completude (specs)
- [x] docs/README.md : presentation, stack, URL, liens
- [x] docs/architecture.md : arborescence, flux de donnees, layouts, couleurs
- [x] docs/contenu.md : pages, modeles JSON, fichiers data
- [x] docs/guide-contribution.md : prestation, couleurs, navigation, offres, conventions
- [x] CLAUDE.md : section regles de collaboration ajoutee
- [x] CLAUDE.md : reference vers docs/ ajoutee

### Clarte et AI-readability
- [x] Structure coherente et titres clairs
- [x] Exemples concrets presentes
- [x] Points d'attention et limitations documentes
- [x] Regles absolues mises en evidence
- [ ] Incoherence sur les valeurs speciales de `price` entre contenu.md et guide-contribution.md

### Liens internes
- [x] `docs/README.md` pointe vers les 3 autres fichiers avec chemins relatifs corrects
- [x] `CLAUDE.md` pointe vers les 4 fichiers docs/ avec chemins corrects

---

## Verdict final

### CHANGES REQUIRED

2 changements HIGH requis avant approbation :

1. **Corriger les noms de classes Tailwind dans `docs/architecture.md`** : la table des tokens et les exemples de classes utilisent des noms incorrects pour les tokens `button` (`button-bg` au lieu de `btn-bg`, `button-text` au lieu de `btn-text`). Un agent ou contributeur utilisant ces noms produira du CSS non applique.

2. **Distinguer clairement les noms de tokens `params.toml` des noms de classes Tailwind** dans `docs/architecture.md` : la table actuelle melange les deux notations sans les differencier, ce qui est source de confusion.

Les autres points (incoherence sur `price: 0` dans schema simple, mention de taille en MB, ambiguite Congo dans CLAUDE.md) sont de priorite basse a moyenne et peuvent etre corriges dans la meme passe.
