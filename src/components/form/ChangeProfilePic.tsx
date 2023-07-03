import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import getCroppedImg from '@/common/utils/crop';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import { useAppSelector } from '@/store/hook';
import AppButton from '../ui/AppButton';
import AppLoader from '../ui/AppLoader';

type PropsType = {
  closeModal: () => void;
};
function ChangeProfilePic({ closeModal }: PropsType) {
  const user = useAppSelector((state) => state.user);
  const [selectedImg, setSelectedImg] = useState<File>();
  const [croppedImg, setCroppedImg] = useState<File>();
  const [imgCroppedAreaPixels, setImgCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setImgCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const cropImage = async () => {
    try {
      if (selectedImg) {
        const cropimg = await getCroppedImg(
          URL.createObjectURL(selectedImg),
          imgCroppedAreaPixels
        );
        setCroppedImg(cropimg);
        setSelectedImg(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate, isLoading } = useUpdateProfile({});

  const onFormSubmit = () => {
    const formData = new FormData();
    if (croppedImg) formData.append('profilePic', croppedImg);
    mutate({ data: formData, username: user.username });
    closeModal();
  };

  if (isLoading) {
    return <AppLoader />;
  }

  if (selectedImg !== undefined) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="10px"
      >
        <Text mb={2}>Image Preview:</Text>
        <Box
          minW={300}
          minH={300}
          position="relative"
          border="1px solid"
          borderColor="gray.300"
        >
          <Cropper
            image={URL.createObjectURL(selectedImg)}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </Box>
        <Button color="white" bgColor="primary.300" onClick={cropImage}>
          Apply
        </Button>
      </Box>
    );
  }

  return (
    <form>
      <Stack
        spacing={4}
        padding={10}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          {!croppedImg && (
            <input
              id="file-input"
              type="file"
              multiple
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) setSelectedImg(e.target.files[0]);
              }}
              accept="image/*"
            />
          )}
        </Box>
        <Box>
          {croppedImg && (
            <img
              src={URL.createObjectURL(croppedImg)}
              alt="cropped"
              width="100"
              height="100"
            />
          )}
        </Box>

        {croppedImg && (
          <AppButton action={onFormSubmit} text="Change Profile" />
        )}
      </Stack>
    </form>
  );
}

export default ChangeProfilePic;
