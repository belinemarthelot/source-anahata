import { Button, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import StyledAppBarButton from "./StyledAppBarButton";

export default function StyledAppBarButtonMenu(props: {
  title: string;
  name: string;
  activeName: string;
  handleButtonClick: any;
  primary: boolean;
  listItemNames: string[];
  listItemUrls: string[];
}) {
  const { title, name, activeName, primary, handleButtonClick, listItemNames, listItemUrls} = props;

  const theme = useTheme();
	const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleButtonMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleButtonMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isSmScreen ? 
      <>
        {listItemNames.map((listItemName, index) => {
          return <StyledAppBarButton 
            key={listItemName} 
            title={listItemName} 
            name={listItemUrls[index]} 
            activeName={activeName} 
            primary={primary} 
            handleButtonClick={handleButtonClick}
          />;
        })}
      </> 
      : 
      <>
        <Button
          variant={primary === true ? "contained" : activeName === name ? "outlined" : "text"}
          color={activeName === name || primary === true ? "primary" : "inherit"}
          style={{ color: activeName === name ? "#000" : "" }}
          onClick={handleButtonMenuOpen}
        >
          {title}
        </Button>
        <Menu
          key={"Soins menu"}
          anchorEl={anchorEl}
          open={open}
          onClose={handleButtonMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {listItemNames.map((listItemName, index) => { 
            return <MenuItem key={listItemName} onClick={() => {handleButtonMenuClose(); handleButtonClick(listItemUrls[index])}}>{listItemName}</MenuItem> 
          }
          )}
        </Menu>
      </>}
    </>
  );
}
