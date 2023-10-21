import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

import HeroBanner from "../../components/HeroBanner";

import logo from "../../assets/images/logo-source.jpg";
import InstitutPresentation from "../../components/InsitutPresentation";
import InstitutPaysage from '../../assets/images/Institut-paysage.jpg';
import InstitutPaysage2 from '../../assets/images/Institut-paysage2.jpg';
import InstitutPortrait from '../../assets/images/Institut-portrait.jpg';
import LitPaysage from '../../assets/images/Lit-bougie-paysage.jpg';
import LitPortrait from '../../assets/images/Lit-bougie-portrait.jpg';

export default function Home() {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid
        item
        container
        justifyContent={"center"}
        style={{ backgroundColor: "#fff" }}
      >
        <img src={logo} alt="logo" style={{ width: "40vw" }}></img>
      </Grid>
      <Grid item container justifyContent={"center"}>
        <Typography variant="h6" color={"primary"}>
          Institut de bien-être Source d'Anāhata - Prenois (21370)
        </Typography>
      </Grid>
      <InstitutPresentation />
      <Grid item container justifyContent={"center"} pt={3} mb={3}>
        <HeroBanner
          side={0}
          title="Soins corps"
          image={LitPaysage}
          description="Offrez un moment de bien-être à votre esprit et libérez votre corps des tensions du quotidien."
          button="Découvrez les soins corps"
		  buttonLink="/soins-corps"
        />
        <HeroBanner
          side={1}
          title="Soins visage"
          image={InstitutPaysage}
          description="Grâce à la Mixologie ainsi qu'à la synergie des gestes inspirés de la gym faciale et l'utilisation de 3 accessoires en jade blanc. Votre peau aura un glow unique!"
          button="Découvrez les soins visages"
		  buttonLink="/soins-visage"
        />
        <HeroBanner
          side={0}
          title="Épilations"
          image={InstitutPaysage2}
          description="L'utilisation de la marque française Perron Rigot permet un soin sur mesure pour une peau douce et un résultat parfait."
          button="Découvrez les épilations"
		  buttonLink="/epilations"
        />
        <HeroBanner
          side={1}
          title="Beauté du regard"
          image={LitPaysage}
          description="La marque Combinal permet d'intensifier votre regard pour une mise en valeur en toute occasion."
          button="Découvrez la beauté du regard"
		  buttonLink="/beaute-du-regard"
        />
        <HeroBanner
          side={0}
          title="Onglerie"
          image={InstitutPaysage}
          description="Parce que ce sont des zones du corps souvent oubliées, prenez le temps de les chouchouter."
          button="Découvrez l'onglerie"
		  buttonLink="/onglerie"
        />
      </Grid>
    </Grid>
  );
}
