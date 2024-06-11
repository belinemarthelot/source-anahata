import { Button } from "@mui/material";
import React from "react";

export default function StyledAppBarButton(props: {
  title: string;
  name: string;
  activeName: string;
  primary: boolean;
  handleButtonClick: any;
}) {
  const { title, name, activeName, primary, handleButtonClick } = props;
  return (
    <Button
      variant={primary === true ? "contained" : activeName === name ? "outlined" : "text"}
      color={activeName === name || primary === true ? "primary" : "inherit"}
      style={{ color: activeName === name ? "#000" : "" }}
      onClick={() => handleButtonClick(name)}
    >
      {title}
    </Button>
  );
}
