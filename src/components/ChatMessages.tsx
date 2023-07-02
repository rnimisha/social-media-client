import { socket } from '@/common/api';
import { sendMessageService } from '@/common/services';
import convertMessagelist from '@/common/utils/convert-messagelist';
import useGetChatMessages from '@/hooks/useGetChatMessages';
import { useAppSelector } from '@/store/hook';
import { Box, Button, Flex, Textarea } from '@chakra-ui/react';
import { createRef, useEffect, useState } from 'react';
import { MessageList, MessageType } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

type PropsType = {
  chatId: number;
};

function ChatMessages({ chatId }: PropsType) {
  const currUser = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const { data: allMsg } = useGetChatMessages({ chatId });

  useEffect(() => {
    if (allMsg) {
      const converted = convertMessagelist(allMsg, currUser.id);
      setMessages(converted);
    }
  }, [allMsg]);
  const messageListReferance = createRef();

  return (
    <>
      <Box overflowY="auto" flex="100%">
        <MessageList
          referance={messageListReferance}
          className="message-list"
          lockable
          toBottomHeight="100%"
          dataSource={messages}
        />
      </Box>
      <Flex align="center" justify="space-between" mt="auto" p={4}>
        <Textarea
          flex="1"
          height="90px"
          resize="none"
          placeholder="Write something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          ml={4}
          px={4}
          h={8}
          colorScheme="teal"
          borderRadius="md"
          onClick={() => sendMessageService(message, chatId, currUser.id)}
        >
          Send
        </Button>
      </Flex>
    </>
  );
}

export default ChatMessages;
