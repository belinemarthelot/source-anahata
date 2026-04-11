# Exploration - Contenu et Donnees

## Pages (content/)
7 fichiers MD, structure plate:
- _index.md : Homepage (titre, subtitle, description, bio fondatrice)
- soins-corps.md : layout prestation, data_file soin-corps
- visage.md : layout prestation, data_file soin-visage
- epilations.md : layout prestation, data_file epilation
- beaute-du-regard.md : layout prestation, data_file beaute-du-regard
- onglerie.md : layout prestation, data_file onglerie
- rendez-vous.md : layout rendez-vous (page Planity)

## Donnees (data/)
9 fichiers JSON:
- soin-corps.json : layout complex, 5 univers (Le Ressourcant, L'Eveil d'Agnisia, Rituels du Monde, Maderosport, Les Essentiels)
- soin-visage.json : layout complex, 3 univers (Magic Face, Phyt's Bio, Biodroga)
- epilation.json : layout simple, 14 prestations
- beaute-du-regard.json : layout simple, 5 prestations
- onglerie.json : layout simple, 7 prestations
- insitut-presentation.json : homepage hero (typo dans le nom)
- prestations.json : grille services homepage (5 cartes)
- offre-exclusive.json : offres du moment (Nouveautes)
- offre-exclusive_old.json : archive (non utilise)

## Modeles de donnees
- Simple: { title, layout, images[], prestations[]: { title, description, price } }
- Complex: { title, layout, images[], univers[]: { name, description, image, prestations[]: { title, description, price, options[]? } } }
