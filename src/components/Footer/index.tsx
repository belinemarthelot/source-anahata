import { Copyright } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
	return (
		<Grid container justifyContent={'center'} alignItems={'center'}>
			<Copyright />
			<Typography variant={"subtitle1"}>2023 Célie institut - 21370, Prenois</Typography>
		</Grid>
	);
}
