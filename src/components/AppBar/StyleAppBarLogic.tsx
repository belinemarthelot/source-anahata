import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledAppBarButton from "./StyledAppBarButton";
import { Button, Menu, MenuItem } from "@mui/material";
import StyledAppBarButtonMenu from "./StyledAppBarButtonMenu";

export default function StyledAppBarLogic() {
  const navigate = useNavigate();

  const [activeName, setActiveName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleButtonClick = (name: string) => {
    setActiveName(name);
    navigate(name);
    setMobileOpen(!mobileOpen);
  };

  const buttonList = [
    <StyledAppBarButton
      key={"Accueil"}
      title="Accueil"
      name=""
      activeName={activeName}
      primary={false}
      handleButtonClick={handleButtonClick}
    />,
    <StyledAppBarButtonMenu
      key={"Soins"}
      title="Soins"
      name="soins"
      activeName={activeName}
      primary={false}
      listItemNames={["Soins du corps", "Soins du visage", "Soins en duo"]}
      listItemUrls={["soins-corps", "soins-visage", "soins-duo"]}
      handleButtonClick={handleButtonClick}
    />,
    <StyledAppBarButton
      key={"Madérothérapie"}
      title="Madérothérapie"
      name="maderotherapie"
      activeName={activeName}
      primary={false}
      handleButtonClick={handleButtonClick}
    />,
    <StyledAppBarButton
      key={"Épilations"}
      title="Épilations"
      name="epilations"
      activeName={activeName}
      primary={false}
      handleButtonClick={handleButtonClick}
    />,
    <StyledAppBarButton
      key={"Beauté du regard"}
      title="Beauté du regard"
      name="beaute-du-regard"
      activeName={activeName}
      primary={false}
      handleButtonClick={handleButtonClick}
    />,
    <StyledAppBarButton
      key={"Onglerie"}
      title="Onglerie"
      name="onglerie"
      activeName={activeName}
      primary={false}
      handleButtonClick={handleButtonClick}
    />,
    <StyledAppBarButton
    key={"Prendre rendez-vous"}
    title="Prendre rendez-vous"
    name="rendez-vous"
    activeName={activeName}
    primary={true}
    handleButtonClick={handleButtonClick}
    />,
  ];

  return { mobileOpen, setMobileOpen, buttonList };
}
