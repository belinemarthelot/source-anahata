import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ImageCarousel from "../ImageCarrousel";
import data from "../../assets/data/insitut-presentation.json";
import { useEffect, useState } from "react";

export default function InstitutPresentation() {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages([]);
    data.images.forEach((image) => {
      let newImage = require(`../../assets/images/${image}`);
      setImages((oldImages) => [...oldImages, newImage]);
    });
  }, []);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      mb={4}
      style={{ backgroundColor: theme.palette.background.paper }}
      pt={3}
      pb={isMdScreen ? 0 : 3}
    >
      <Grid item sm={12} md={3} style={{ boxShadow: "-3px 4px 15px -1px rgba(0,0,0,0.80)"}}>
        <ImageCarousel images={images} />
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={5}
        flexDirection={"column"}
        justifyContent={"center"}
        p={8}
        gap={3}
        mt={isMdScreen ? 0 : 0}
        style={{ boxShadow: "5px 4px 15px -1px rgba(0,0,0,0.70)"}}
        sx={{
          transform: "scale(1)",
          transition: "transform 0.2s ease",
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Grid item container justifyContent={"center"}>
          <Typography variant="h4">{data.title}</Typography>
        </Grid>
        <Grid item container justifyContent={"center"}>
          <Grid
            item
            style={{
              borderBottom: `1px solid ${theme.palette.primary.main}`,
              width: "30%",
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1">{data.description1}</Typography>
        </Grid>
        <Grid item container justifyContent={"center"}>
          <Typography variant="subtitle1" textAlign={"justify"}>
            {data.description2}
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign={"center"}
            style={{ marginTop: "3em" }}
          >
            {"Disponibilités, prestations uniquement sur rendez-vous:"}
            <br />
            {"Lundi, mercredi, vendredi: 9h - 19h"}
            <br />
            {"Mardi, jeudi: 10h - 21h"}
            <br />
            {"Samedi: 10h - 16h"}
          </Typography>
          <Typography variant="subtitle1" textAlign={"justify"} style={{ marginTop: "3em" }}>
            {data.description3 ? data.description3.split("\n").map(function(item, idx, arr) {
            return (
              <>
                {item}
                {arr.length - 1 == idx ? "" : <br style={{display: "block", margin: "3px 0px"}}/>}
              </>
            )
          }) : ""}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
