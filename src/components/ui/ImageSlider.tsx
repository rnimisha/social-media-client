import Slider from 'react-slick';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import { BASEURL, sliderSettings } from '@/constants';
import useSlider from '@/hooks/useSlider';
import { PostImageType } from '@/common/types';

type PropsType = {
  images: PostImageType[];
};
function ImageSlider({ images }: PropsType) {
  const { sliderRef, slideToNext, slideToPrev } = useSlider();
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  return (
    <Box position="relative" height="600px" width="full" overflow="hidden">
      <IconButton
        aria-label="left-arrow"
        colorScheme="twitter"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={slideToPrev}
      >
        <BiLeftArrowAlt />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        colorScheme="twitter"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={slideToNext}
      >
        <BiRightArrowAlt />
      </IconButton>

      <Slider {...sliderSettings} ref={sliderRef}>
        {images.map((image) => (
          <Box
            key={image.id}
            height="xl"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`${BASEURL}/${image.basename}`}
          />
        ))}
      </Slider>
    </Box>
  );
}

export default ImageSlider;