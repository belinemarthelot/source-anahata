import { Box, Grid, keyframes, Typography, useMediaQuery, useTheme } from "@mui/material";

import data from "../../assets/data/offre-exclusive.json";
import PrestationElement from "../PrestationElement";

export default function Exclusivity() {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));

  const marqueeAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      style={{ backgroundColor: theme.palette.background.paper }}
      pt={data && data.offers.length > 0 ? 4 : 0}
    >
      {data && data.offers.length > 0 ? (
        <>
          <Grid
            sm={12}
            container
            justifyContent={"center"}
          >
            <Typography variant={"h4"} style={{ borderBottom: `1px solid ${theme.palette.primary.main}`}}>
              {data.title}
            </Typography>
          </Grid>
          <Grid sm={12} md={7} container justifyContent={"center"}>
            {data && data.offers ? (
              data.offers.map((element: any, key: number) => (
                <PrestationElement
                  key={key}
                  title={element.title}
                  description={element.description}
                  price={element.price}
                  options={element.options ? element.options : []}
                  price_discount={element.price_discount}
                />
              ))
            ) : (
              <></>
            )}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </Grid>
  );
}
