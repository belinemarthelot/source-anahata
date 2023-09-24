import React from 'react';
import { Grid, Typography } from '@mui/material';

export default function PrestationElement(props: {
	title: string;
	description: string;
	price: number;
	options: [{ name: string; description: string; price: number }];
}) {
	const { title, description, price, options } = props;

	return (
		<Grid container justifyContent={'center'}>
			<Grid container style={{ width: '100%' }} gap={1}>
				<Grid item xs={9}>
					<Typography>{title}</Typography>
					<Typography style={{ fontSize: '.9em' }}>{description}</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography>{price} €</Typography>
				</Grid>
			</Grid>
			{options.map((option: { name: string; description: string; price: number }, key: number) => {
				return (
					<Grid container key={key} gap={1}>
						<Grid item xs={9} mb={1.5}>
							<Typography style={{ marginLeft: '2em' }}>- {option.name}</Typography>
							<Typography style={{ fontSize: '.9em', marginLeft: '2em' }}>
								{option.description}
							</Typography>
						</Grid>
						<Grid item xs={2} justifyContent={'flex-end'}>
							<Typography key={key}>+{option.price} €</Typography>
						</Grid>
					</Grid>
				);
			})}
		</Grid>
	);
}
