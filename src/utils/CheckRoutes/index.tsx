import React from 'react';
import { Outlet } from 'react-router-dom';
import StyledAppBar from '../../components/AppBar';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CheckRoutes() {
	const isSmScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<StyledAppBar />
				</Grid>
				<Grid item xs={12} mt={isSmScreen ? 8 : 14}>
					<Outlet />
				</Grid>
				<Grid item xs={12}>
					<Footer />
				</Grid>
			</Grid>
		</>
	);
}
