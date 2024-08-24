import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
}

export default function Prestation(props: { jsonFile: string }) {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [data, setData] = useState<null | IData>(null);
  const [img, setImg] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    let dataImport = require(`../../assets/data/${props.jsonFile}`);
    setData(dataImport);
  }, [location]);

  useEffect(() => {
    if (data != null) {
      setImages([])
      data.images.forEach((image) => {
        let newImage = require(`../../assets/images/${image}`);
        setImages((oldImages) => [...oldImages, newImage]);
      });
    }
  }, [data]);

  return (
    <Grid container alignItems={"center"} flexDirection={"column"} mb={5}>
      <Grid container style={{ width: isMdScreen ? "100%" : "80%" }}>
        {images.length === 1 ? (
          <Grid item sm={5}>
            <img style={{ width: "100%" }} src={images[0]} alt="Image épilation" />
          </Grid>
        ) : (
          <Grid item sm={5}>
            <ImageCarousel images={images} />
          </Grid>
        )}
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
            {data && data.prestations ? (
              data.prestations.map((element: any, key: number) => (
                <div key={key}>
                {element.subtitle ? 
                <>
                  <Typography
                    variant="h6"
                    style={{
                      borderBottom: `1px solid ${theme.palette.primary.main}`,
                      textAlign: "center",
                      marginBottom: "1em",
                    }}
                  >
                    {element.subtitle}
                  </Typography>
                </> : <></>}
                <PrestationElement
                  key={key}
                  title={element.title}
                  description={element.description}
                  subdescriptions={element.subdescriptions ? element.subdescriptions : []}
                  price={element.price ? element.price : 0}
                  prices={element.prices ? element.prices : []}
                  options={element.options ? element.options : []}
                />
                </div>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}