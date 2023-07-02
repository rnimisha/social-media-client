import { Box } from '@chakra-ui/react';
import { RotatingLines } from 'react-loader-spinner';

function AppLoader() {
  return (
    <Box
      w="100%"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="whiteAlpha.500"
      zIndex={9999}
    >
      <RotatingLines
        strokeColor="#93BFCF"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible
      />
    </Box>
  );
}

export default AppLoader;
