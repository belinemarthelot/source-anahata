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

interface IOption {
  title: String;
  description: String;
  price: Number;
}

interface IPrestation {
  title: String;
  description: String;
  price: Number;
  options: [IOption];
}

interface IData {
  title: String;
  img: String;
  prestations: [IPrestation];
}

export default function Prestation(props: { jsonFile: String }) {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [data, setData] = useState<null | IData>(null);
  const [img, setImg] = useState("");
  const location = useLocation();

  useEffect(() => {
    let dataImport = require(`../../assets/data/${props.jsonFile}`);
    setData(dataImport);
    let image = require(`../../assets/images/${dataImport.img}`);
    setImg(image);
  }, [location]);

  return (
    <Grid container alignItems={"center"} flexDirection={"column"} mb={2}>
      <Grid container style={{ width: isMdScreen ? "100%" : "80%" }}>
        <Grid item sm={5}>
          <img style={{ width: "100%" }} src={img} alt="Image épilation" />
        </Grid>
        <Grid item sm={7} container justifyContent={"center"} mt={2}>
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
                <PrestationElement
                  key={key}
                  title={element.title}
                  description={element.description}
                  price={element.price}
                  options={element.options ? element.options : []}
                />
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

// <Button variant="contained" color="primary" style={{ marginTop: '2em' }}>
//Prendre un rendez-vous
//</Button>
