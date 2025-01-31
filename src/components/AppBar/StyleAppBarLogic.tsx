import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledAppBarButton from "./StyledAppBarButton";

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
    <StyledAppBarButton
      key={"Soins corps"}
      title="Soins corps"
      name="soins-corps"
      activeName={activeName}
      primary={false}
      handleButtonClick={handleButtonClick}
    />,
    <StyledAppBarButton
      key={"Soins visage"}
      title="Visage"
      name="visage"
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
