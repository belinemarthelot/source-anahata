import { Box, Theme } from '@mui/material';
import React from 'react';

export default function ImageCarouselDots(props: { theme: Theme; images: string[]; activeDotIndex: number, handleDotClick: any }) {
	const { theme, images, activeDotIndex, handleDotClick } = props;
	return (
		<Box mt={2} display="flex" justifyContent="center" position={'absolute'} left={0} right={0} bottom={10}>
			<Box
				display="flex"
				justifyContent="center"
				sx={{
					backgroundColor: theme.palette.background.paper,
					padding: '.5em',
					borderRadius: '20px',
					opacity: 0.8
				}}
			>
				{images.map((image, index) => (
					<Box
						key={index}
                        mx={1}
						sx={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor:
								activeDotIndex === index ? theme.palette.primary.dark : theme.palette.primary.main,
							opacity: activeDotIndex === index ? 1 : 0.5,
							cursor: 'pointer'
						}}
						onClick={() => handleDotClick(index)}
					/>
				))}
			</Box>
		</Box>
	);
}
