import { Button } from "@mui/material";
import React from "react";

export default function StyledAppBarButton(props: {
  title: string;
  name: string;
  activeName: string;
  handleButtonClick: any;
}) {
  const { title, name, activeName, handleButtonClick } = props;
  return (
    <Button
      variant={activeName === name ? "outlined" : "text"}
      color={activeName === name ? "primary" : "inherit"}
      style={{ color: activeName === name ? "#000" : "" }}
      onClick={() => handleButtonClick(name)}
    >
      {title}
    </Button>
  );
}
