import React from "react";
import { Grid, Typography } from "@mui/material";

export default function PrestationElement(props: {
  title: string;
  description: string;
  price: number;
  options: [{ title: string; description: string; price: number }];
}) {
  const { title, description, price, options } = props;

  return (
    <Grid container justifyContent={"center"}>
      <Grid
        container
        style={{ width: "100%" }}
        gap={1}
        mb={1}
      >
        <Grid item xs={9}>
          <Typography style={{ fontSize: "1.05em" }}>{title}</Typography>
          <Typography style={{ fontSize: ".85em" }}>{description}</Typography>
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-end"}>
          <Typography>
            {price}
            {price ? " €" : ""}{" "}
          </Typography>
        </Grid>
      </Grid>
      {options.map(
        (
          option: { title: string; description: string; price: number },
          key: number
        ) => {
          return (
            <Grid container key={key} gap={1}>
              <Grid item xs={9} mb={1.5}>
                <Typography style={{ marginLeft: "1em" }}>
                  - {option.title}
                </Typography>
                <Typography style={{ fontSize: ".85em", marginLeft: "1em" }}>
                  {option.description}
                </Typography>
              </Grid>
              <Grid item xs={2} container justifyContent={"flex-end"}>
                <Typography key={key}>+{option.price} €</Typography>
              </Grid>
            </Grid>
          );
        }
      )}
    </Grid>
  );
}
