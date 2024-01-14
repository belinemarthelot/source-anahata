import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { InView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const FadingInView = (props: { children: any }) => {
  const [isFadeIn, setIsFadeIn] = useState(false);
  const { children } = props;

  return (
    <InView
      as="div"
      onChange={(inView) => setIsFadeIn(inView)}
      threshold={0.7} // Adjust this value to control when the text appears
      triggerOnce
    >
      {children(isFadeIn)}
    </InView>
  );
};

export default function HeroBanner(props: {
  side: number;
  image: string;
  title: string;
  description: string;
  button: string;
  buttonLink: string;
}) {
  const { side, image, title, description, button, buttonLink } = props;

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent={"center"}
      flexDirection={side === 0 ? "row" : "row-reverse"}
    >
      <Grid item xs={12} sm={5}>
        <img src={image} alt="logo" style={{ width: "100%" }} />
      </Grid>
      <Grid item container xs={12} md={5} alignItems={"center"}>
        <FadingInView>
          {(isFadeIn: boolean) => (
            <Grid
              item
              container
              flexDirection={"column"}
              alignItems={
                isMdScreen ? "center" : side === 0 ? "flex-start" : "flex-end"
              }
              p={8}
              gap={3}
              sx={{
                transform: isFadeIn ? "scale(1)" : "scale(0.7)",
                transition: "transform 1s ease", // Adjust the transition duration as needed
                opacity: isFadeIn ? 1 : 0,
              }}
            >
              <Typography variant="h4">{title}</Typography>
              <Typography
                variant="body1"
                textAlign={side === 0 || isMdScreen ? "left" : "right"}
                style={{ width: isSmScreen ? "100%" : "90%" }}
              >
                {description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{
                  textTransform: "unset",
                  minWidth: isSmScreen ? "100%" : "50%",
                }}
                onClick={() => navigate(buttonLink)}
              >
                {button}
              </Button>
            </Grid>
          )}
        </FadingInView>
      </Grid>
    </Grid>
  );
}
