import { Instagram, LinkOff, LocalPhone, Room } from '@mui/icons-material';
import { Button, Grid, IconButton, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import HeaderLogic from './HeaderLogic';

export default function Header() {
	// const localisationUrl = 'https://www.google.com/maps/place/19+Rue+du+Mini+Golf,+21370+Prenois/';
	// const telephoneNumber = '06 42 68 91 01';
	// const instituteAddress = '19 rue du mini golf, 21370, Prenois';
	const theme = useTheme();
	const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

	
	const { localisationUrl, telephoneNumber, address, instagramUrl } = HeaderLogic();

	return (
		<Grid
			container
			gap={1}
			alignItems={'center'}
			justifyContent={'center'}
			style={{ borderTop: `1px solid ${theme.palette.primary.main}` }}
			mt={1}
			pt={isSmScreen ? 2 : 0}
		>
			<Grid item>
				<Grid container alignItems={'center'}>
					<LocalPhone />
					<Typography variant={isMdScreen ? 'subtitle1' : 'body2'}>
						{isMdScreen ? 'Tel :' : 'Téléphone :'}{' '}
					</Typography>
					<Link
						variant={isMdScreen ? 'subtitle1' : 'body2'}
						href={`tel:${telephoneNumber}`}
						target="_blank"
						rel="noopener noreferrer"
						color={'inherit'}
					>
						{telephoneNumber}
					</Link>
				</Grid>
			</Grid>
			<Link
				variant={isMdScreen ? 'subtitle1' : 'body2'}
				href={localisationUrl}
				target="_blank"
				rel="noopener noreferrer"
				color={'inherit'}
			>
				<Grid container alignItems={'center'}>
					<Room />
					<Typography variant={isMdScreen ? 'subtitle1' : 'body2'}>{address}</Typography>
				</Grid>
			</Link>
			<IconButton aria-label="Instagram" href={instagramUrl} target="_blank" rel="noopener noreferrer">
				<Instagram fontSize={isMdScreen ? 'medium' : 'large'} color="primary" />
			</IconButton>
			{/* <Button variant="contained" color="primary" style={{ fontSize: isMdScreen ? '.6em' : '.8em' }}>
				Prendre rendez-vous
			</Button> */}
		</Grid>
	);
}
