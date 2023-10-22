import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import HeroBanner from "../../components/HeroBanner";

import logo from "../../assets/images/logo-source.jpg";
import InstitutPresentation from "../../components/InsitutPresentation";

import data from "../../assets/data/prestations.json";

export default function Home() {
  const theme = useTheme();
	const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container>
      {isSmScreen ? <></> : <Grid
        item
        container
        justifyContent={"center"}
        style={{ backgroundColor: "#fff" }}
      >
        <img src={logo} alt="logo" style={{ width: "40vw" }}></img>
      </Grid>}
      <Grid item container justifyContent={"center"}>
        <Typography variant="h6" color={"primary"} textAlign={'center'}>
          Institut de bien-être Source d'Anāhata - Prenois (21370)
        </Typography>
      </Grid>
      <InstitutPresentation />
      <Grid item container justifyContent={"center"} pt={3} mb={3}>
        {data.prestations.map((prestation, index) => {
          let image = require(`../../assets/images/${prestation.image}`);
          return <HeroBanner
            key={index}
            side={(index + 1) % 2}
            title={prestation.title}
            image={image}
            description={prestation.description}
            button={prestation.button}
            buttonLink={prestation.buttonLink}
          />
        })}
      </Grid>
    </Grid>
  );
}
