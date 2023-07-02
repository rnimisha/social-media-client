/* eslint-disable jsx-a11y/label-has-associated-control */
import useAddPost from '@/hooks/useAddPost';
import { Flex, Icon, Textarea, Box, Button, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import AppLoader from '../ui/AppLoader';

function AddPostForm() {
  const [caption, setCaption] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);
  const isMaxFilesReached = selectedFiles.length >= 4;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewImgs(urls);
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);

    const updatedUrls = [...previewImgs];
    updatedUrls.splice(index, 1);
    setPreviewImgs(updatedUrls);
  };

  const onSubmitSuccess = () => {
    setCaption('');
    setSelectedFiles([]);
    setPreviewImgs([]);
  };

  const { mutate: addPost, isLoading } = useAddPost({
    onSuccess: onSubmitSuccess,
  });
  const onFormSubmit = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append(`images`, file);
    });
    formData.append('description', caption);

    addPost(formData);
  };

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <form>
      <Textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter ......."
        borderColor="blackAlpha.100"
      />

      <Box pt={4}>
        {previewImgs.map((url, index) => (
          <Box key={url} display="inline-block" position="relative" mr={2}>
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              width="100"
              height="100"
            />
            <Button
              size="sm"
              backgroundColor="tomato"
              opacity={0.8}
              color="white"
              position="absolute"
              top={-2}
              right={-2}
              borderRadius="full"
              onClick={() => removeImage(index)}
            >
              X
            </Button>
          </Box>
        ))}
      </Box>
      <Flex justifyContent="space-between" my={4} alignItems="baseline">
        <Box>
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
            disabled={isMaxFilesReached}
          />
          <label htmlFor="file-input">
            <Icon
              as={BiImageAdd}
              boxSize={8}
              ml={2}
              color="primary.300"
              cursor="pointer"
            />
          </label>
        </Box>
        <Button
          backgroundColor="primary.300"
          color="#fff"
          mt={4}
          disabled={isMaxFilesReached}
          onClick={onFormSubmit}
        >
          Upload
        </Button>
      </Flex>
    </form>
  );
}

export default AddPostForm;
