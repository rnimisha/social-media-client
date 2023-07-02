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
  const { sliderRef } = useSlider();
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const handleSliderPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleSliderNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <Box position="relative" height="520px" width="full" overflow="hidden">
      {images.length > 1 && (
        <>
          <IconButton
            aria-label="left-arrow"
            bgColor="primary.300"
            color="white"
            opacity={0.8}
            borderRadius="full"
            position="absolute"
            left={side}
            top={top}
            transform="translate(0%, -50%)"
            zIndex={2}
            onClick={handleSliderPrev}
          >
            <BiLeftArrowAlt />
          </IconButton>

          <IconButton
            aria-label="right-arrow"
            bgColor="primary.300"
            color="white"
            opacity={0.8}
            borderRadius="full"
            position="absolute"
            right={side}
            top={top}
            transform="translate(0%, -50%)"
            zIndex={2}
            onClick={handleSliderNext}
          >
            <BiRightArrowAlt />
          </IconButton>
        </>
      )}

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
