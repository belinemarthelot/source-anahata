import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/icons-material';
import { Button, Drawer, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import StyledAppBarLogic from './StyleAppBarLogic';
import Header from '../Header';

export default function StyledAppBar() {
	const theme = useTheme();
	const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

	const { mobileOpen, setMobileOpen, buttonList } = StyledAppBarLogic();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" style={{ backgroundColor: theme.palette.background.paper }}>
				<Toolbar>
					{isSmScreen ? (
						<>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								disableRipple
								sx={{ mr: 2 }}
								onClick={() => setMobileOpen(!mobileOpen)}
							>
								<Menu />
							</IconButton>
							<Drawer variant={'temporary'} open={mobileOpen} onClose={() => setMobileOpen(!mobileOpen)}>
								<IconButton onClick={() => setMobileOpen(!mobileOpen)} color="inherit" disableRipple>
									<Menu />
								</IconButton>
								<Grid
									container
									item
									flexGrow={1}
									direction={'column'}
									style={{ width: '100vw' }}
									alignItems={'center'}
								>
									{buttonList.map((button: any) => button)}
									<Header />
								</Grid>
							</Drawer>
						</>
					) : (
						<></>
					)}
					<Grid container direction={'column'} marginTop={1}>
						<Grid item flexGrow={1} style={{ display: isSmScreen ? 'none' : '' }}>
							<Grid item container justifyContent={'center'}>
								{buttonList.map((button: any) => button)}
							</Grid>
						</Grid>
						<Grid item flexGrow={1} style={{ display: isSmScreen ? 'none' : '' }}>
							<Header />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
