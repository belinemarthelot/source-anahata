import React from "react";
import { Grid, Typography } from "@mui/material";

export default function PrestationElement(props: {
  title: string;
  description: string;
  subdescriptions: [[string]];
  price: number;
  prices: number[];
  options: [{ title: string; description: string; price: number }];
}) {
  const { title, description, subdescriptions, price, options, prices } = props;

  return (
    <Grid container justifyContent={"center"}>
      <Grid
        container
        alignItems={"center"}
        style={{ width: "100%" }}
        gap={1}
        mb={1}
      >
        <Grid item xs={9}>
          <Typography style={{ fontSize: "1.05em" }}>{title}</Typography>
          <Typography style={{ fontSize: ".85em" }}>{description}</Typography>
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-end"}>
          {price ? 
            <Typography>{price} €</Typography> :
            <></>
          }
          {prices.length == 2 ? 
            <Typography>
              {prices[0]} à {prices[1]} €
            </Typography> : <></>
          } 
        </Grid>
      </Grid>
      {subdescriptions.map((subdescription, key) => {
        return (
          <Grid container key={key} gap={1}>
            <Grid item xs={9} mb={1}>
              {subdescription.map((subdesc, key) => {
                return <Typography key={key} style={{ fontSize: ".85em" }}>{subdesc}</Typography>;
              })}    
            </Grid>
          </Grid>
        );
      })}
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
