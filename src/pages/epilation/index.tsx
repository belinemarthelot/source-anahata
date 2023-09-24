import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import PrestationElement from '../../components/PrestationElement';

import epilationImage from '../../assets/images/epilation.jpg';

const prestations = [
	{
		title: 'Lèvres',
		description: '(Tu peux écrire içi une description du soin que tu veux faire)',
		price: 15,
		options: [
			{ name: 'option 1', description: "(Peite description de l'option)", price: 5 },
			{ name: 'option 2', description: "(Peite description de l'option)", price: 5 }
		]
	},
	{
		title: 'Aisselles',
		description: '',
		price: 14
	},
	{
		title: 'Maillot',
		description: '',
		price: 18
	},
	{
		title: 'Maillot échancré',
		description: '',
		price: 22
	},
	{
		title: 'Maillot intégral',
		description: '',
		price: 35
	},
	{
		title: '1/2 jambes ',
		description: '',
		price: 28
	},
	{
		title: 'Cuisses',
		description: '',
		price: 30
	},
	{
		title: '3/4 Jambes ',
		description: '',
		price: 33
	},
	{
		title: 'Jambes complètes',
		description: '',
		price: 42
	}
];

export default function Epilation() {
	const theme = useTheme();
	const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Grid container alignItems={'center'} flexDirection={'column'}>
			<Grid container style={{ width: isMdScreen ? '100%' : '80%' }}>
				<Grid item sm={6}>
					<img style={{ width: '100%' }} src={epilationImage} alt="Image épilation" />
				</Grid>
				<Grid item sm={6} container justifyContent={'center'} mt={2}>
					<Grid width={'80%'} container justifyContent={'center'}>
						<Typography
							variant="h4"
							style={{ borderBottom: `1px solid ${theme.palette.primary.main}`, textAlign: 'center' }}
						>
							Épilation
						</Typography>
						{prestations.map((element: any, key: number) => (
							<PrestationElement
								key={key}
								title={element.title}
								description={element.description}
								price={element.price}
								options={element.options ? element.options : []}
							/>
						))}
						<Button variant="contained" color="primary" style={{ marginTop: '2em' }}>
							Prendre un rendez-vous
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
