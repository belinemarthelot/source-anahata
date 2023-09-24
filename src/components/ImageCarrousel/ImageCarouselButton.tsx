import { SkipPrevious } from '@mui/icons-material';
import { IconButton, Theme } from '@mui/material';
import React from 'react';

export default function ImageCarouselButton(props: { theme: Theme; handleOnClick: any; Icon: any; left: boolean }) {
	const { theme, handleOnClick, Icon, left } = props;

	return (
		<IconButton
			onClick={handleOnClick}
			sx={{
				position: 'absolute',
				top: '50%',
				left: left ? 20 : 'auto',
				right: left ? 'auto' : 20,
				zIndex: 1,
				backgroundColor: theme.palette.background.paper,
				opacity: 0.7,
				'&:hover': {
					opacity: 1,
					backgroundColor: theme.palette.background.paper
				}
			}}
		>
			<Icon color="primary" />
		</IconButton>
	);
}
