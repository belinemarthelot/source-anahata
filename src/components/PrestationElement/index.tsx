import React from "react";
import { Grid, Typography } from "@mui/material";

export default function PrestationElement(props: {
  title: string;
  description: string;
  price: number;
  options: [
    { title: string; description: string; price: number; add: boolean }
  ];
  price_discount: number;
}) {
  const { title, description, price, options, price_discount } = props;

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
          {description
            ? description.split("\n").map(function (item, idx, arr) {
                return (
                  <>
                    <Typography style={{ fontSize: ".85em" }}>
                      {item}
                    </Typography>
                    {arr.length - 1 == idx ? (
                      ""
                    ) : (
                      <br style={{ display: "block", margin: "5px 0px" }} />
                    )}
                  </>
                );
              })
            : ""}
        </Grid>
        <Grid item xs={2} container justifyContent={"flex-end"}>
          {price_discount != 0 ? (
            <Typography>
              {price_discount} € au lieu de {price} €
            </Typography>
          ) : (
            <Typography>
              {price}
              {price ? " €" : ""}{" "}
            </Typography>
          )}
        </Grid>
      </Grid>
      {options.map(
        (
          option: {
            title: string;
            description: string;
            price: number;
            add: boolean;
          },
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
                <Typography key={key}>
                  {option.add ? "+" : ""}
                  {option.price}
                  {option.price ? " €" : ""}
                </Typography>
              </Grid>
            </Grid>
          );
        }
      )}
    </Grid>
  );
}
