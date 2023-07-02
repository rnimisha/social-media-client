import { sendMessageService } from '@/common/services';
import { convertMessagelist } from '@/common/utils';
import useGetChatMessages from '@/hooks/useGetChatMessages';
import { useAppSelector } from '@/store/hook';
import { Box, Button, Flex, Textarea } from '@chakra-ui/react';
import { createRef, useEffect, useRef, useState } from 'react';
import { MessageList, MessageType } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import useMsgListener from '@/hooks/useMsgListener';

type PropsType = {
  chatId: number;
};

function ChatMessages({ chatId }: PropsType) {
  const currUser = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>('');

  const messageListReferance = createRef();
  const msgRef = useRef<HTMLDivElement>(null);

  useMsgListener({ chatId });
  const { data: allMsg } = useGetChatMessages({ chatId });

  // change format to match the list
  useEffect(() => {
    if (allMsg) {
      const converted = convertMessagelist(allMsg, currUser.id);
      setMessages(converted);
    }
  }, [allMsg]);

  // scroll to bottom
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMsg = () => {
    sendMessageService(message, chatId, currUser.id);
    setMessage('');
  };

  return (
    <>
      <Box
        overflowY="auto"
        flex="100%"
        style={{ height: '400px' }}
        ref={msgRef}
      >
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
          borderColor="green"
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
          onClick={() => sendMsg()}
        >
          Send
        </Button>
      </Flex>
    </>
  );
}

export default ChatMessages;
