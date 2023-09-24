import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

import HeroBanner from '../../components/HeroBanner';

import logo from '../../assets/images/logo.png';
import soinVisageImage from '../../assets/images/soin-visage.jpg';
import epilationImage from '../../assets/images/epilation.jpg';
import InstitutPresentation from '../../components/InsitutPresentation';

export default function Home() {
	const theme = useTheme();

	return (
		<Grid container>
			<Grid item container justifyContent={'center'} style={{ backgroundColor: '#fff' }}>
				<img src={logo} alt="logo" style={{ width: '40vw' }}></img>
			</Grid>
			<Grid item container justifyContent={'center'}>
				<Typography variant="h6" color={'primary'}>
					Institut de bien-être Source d'Anāhata - Prenois (21370)
				</Typography>
			</Grid>
			<InstitutPresentation />
			<Grid item container justifyContent={'center'} gap={6} pt={3}>
				<HeroBanner
					side={0}
					title="Épilation"
					image={epilationImage}
					description="Parce qu’une peau douce est synonyme de féminité, laissez nous vous apportez notre savoir faire pour un confort optimal."
					button="Découvrez les épilations"
				/>
				<HeroBanner
					side={1}
					title="Soins visage"
					image={soinVisageImage}
					description="Le soin du visage est l’un des massages les plus apaisants pour le corps. Il permet de détendre les
					muscles et de favoriser l’évacuation du stress et de la fatigue. Ce rituel beauté s’inscrit de la
					longévité d’une peau fraîche et rajeunie."
					button="Découvrez les soins visage"
				/>
			</Grid>
		</Grid>
	);
}
