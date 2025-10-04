import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrestationElement from "../../components/PrestationElement";
import { useLocation } from "react-router-dom";
import ImageCarousel from "../../components/ImageCarrousel";

interface IOption {
  title: string;
  description: string;
  price: Number;
}

interface IPrestation {
  title: string;
  description: string;
  price: Number;
  options: [IOption];
}

interface IData {
  title: string;
  images: string[];
  prestations: [IPrestation];
  add: boolean;
}

export default function Prestation(props: { jsonFile: string }) {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [data, setData] = useState<null | IData>(null);
  const [images, setImages] = useState<string[]>([]);
  const location = useLocation();

  // Load data JSON
  useEffect(() => {
    const dataImport = require(`../../assets/data/${props.jsonFile}`);
    setData(dataImport);
  }, [location]);

  // Load images
  useEffect(() => {
    if (data != null) {
      setImages([]);
      data.images.forEach((image) => {
        const newImage = require(`../../assets/images/${image}`);
        setImages((oldImages) => [...oldImages, newImage]);
      });
    }
  }, [data]);

  return (
    <Grid container alignItems={"center"} flexDirection={"column"} mb={5}>
      <Grid
        container
        style={{ width: isMdScreen ? "100%" : "80%" }}
        spacing={2}
      >
        <Grid
          item
          sm={5}
          style={{
            position: "sticky",
            top: 100,
            alignSelf: "start",
          }}
        >
          {images.length === 1 ? (
            <img
              style={{ width: "100%" }}
              src={images[0]}
              alt="Image épilation"
            />
          ) : (
            <ImageCarousel images={images} />
          )}
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid
          item
          sm={7}
          container
          justifyContent={"center"}
          alignItems={"flex-start"}
          mt={2}
        >
          <Grid width={"90%"} container justifyContent={"center"}>
            <Typography
              variant="h4"
              style={{
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                textAlign: "center",
                marginBottom: "1em",
              }}
            >
              {data ? data.title : ""}
            </Typography>
            {data && data.prestations
              ? data.prestations.map((element: any, key: number) => (
                  <PrestationElement
                    key={key}
                    title={element.title}
                    description={element.description}
                    price={element.price}
                    options={element.options ? element.options : []}
                    price_discount={0}
                  />
                ))
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
