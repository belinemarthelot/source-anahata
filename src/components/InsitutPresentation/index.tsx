import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';

import ImageCarousel from '../ImageCarrousel';

export default function InstitutPresentation() {
	const theme = useTheme();
	const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<Grid
			container
			justifyContent={'center'}
			mb={4}
			style={{ backgroundColor: theme.palette.background.paper }}
			pt={3}
			pb={isMdScreen ? 0 : 3}
		>
			<Grid item sm={12} md={5}>
				<ImageCarousel />
			</Grid>
			<Grid
				item
				container
				xs={12}
				md={5}
				flexDirection={'column'}
				justifyContent={'center'}
				p={8}
				gap={3}
				mt={isMdScreen ? 0 : 0}
				sx={{
					transform: 'scale(1)',
					transition: 'transform 0.2s ease',
					backgroundColor: 'white',
					boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
					'&:hover': {
						transform: 'scale(1.05)'
					}
				}}
			>
				<Grid item container justifyContent={'center'}>
					<Typography variant="h4">Source d'Anāhata</Typography>
				</Grid>
				<Grid item container justifyContent={'center'}>
					<Grid item style={{ borderBottom: `1px solid ${theme.palette.primary.main}`, width: '30%' }} />
				</Grid>
				<Grid item>
					<Typography variant="body1">Insitut de bien-être à Prenois, 21370</Typography>
				</Grid>
				<Grid item container justifyContent={'center'}>
					<Typography variant="subtitle1" textAlign={'justify'}>
						Source d'Anāhata, un espace hors du temps dédié au bien-être. Mettant en priorité votre
						relaxation et sérénité. Je vous accueille avec toute la bienveillance et l'attention que vous
						méritez. Vous offrir un moment privilégié pour vous ressourcer est ma priorité. Béline
					</Typography>
				</Grid>
				{/* <Grid item container justifyContent={'center'}>
					<Button variant="contained" color="primary">
						Info pratiques
					</Button>
				</Grid> */}
			</Grid>
		</Grid>
	);
}
