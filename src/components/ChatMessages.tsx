import { Box, Button, Flex, Textarea } from '@chakra-ui/react';

type PropsType = {
  chatId: number;
};

function ChatMessages({ chatId }: PropsType) {
  return (
    <>
      <Box flex="1" overflowY="auto" pr={10}>
        chat messages {chatId}
      </Box>
      <Flex
        align="center"
        justify="space-between"
        mt="auto"
        position="sticky"
        bottom={0}
        p={4}
      >
        <Textarea
          flex="1"
          height="90px"
          resize="none"
          placeholder="Write something..."
        />
        <Button
          ml={4}
          px={4}
          h={8}
          colorScheme="teal"
          borderRadius="md"
          onClick={() => console.log('click')}
        >
          Send
        </Button>
      </Flex>
    </>
  );
}

export default ChatMessages;
