import { Box, IconButton, useTheme } from '@mui/material';

import { SkipNext, SkipPrevious } from '@mui/icons-material';


import LitPaysage from '../../assets/images/Lit-bougie-paysage.jpg';
import AcceuilPaysage from '../../assets/images/acceuil-paysage.jpg';
import TableauPaysage from '../../assets/images/tableau-paysage.jpg';


import ImageCarouselLogic from './ImageCarouselLogic';
import ImageCarouselButton from './ImageCarouselButton';
import ImageCarouselDots from './ImageCarouselDots';

const images = [AcceuilPaysage, TableauPaysage, LitPaysage];

export default function ImageCarousel() {
	const theme = useTheme();

	const { currentImageIndex, activeDotIndex, handlePrevious, handleNext, handleDotClick } = ImageCarouselLogic({
		images: images
	});

	return (
		<Box display="flex" justifyContent="center" alignItems="center" position={'relative'}>
			<img
				src={images[currentImageIndex]}
				alt={`Image ${currentImageIndex + 1}`}
				style={{ width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
			/>
			<ImageCarouselButton theme={theme} handleOnClick={handlePrevious} Icon={SkipPrevious} left={true} />
			<ImageCarouselButton theme={theme} handleOnClick={handleNext} Icon={SkipNext} left={false} />
			<ImageCarouselDots
				theme={theme}
				images={images}
				activeDotIndex={activeDotIndex}
				handleDotClick={handleDotClick}
			/>
		</Box>
	);
}
