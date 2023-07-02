import { convertChatlist } from '@/common/utils';
import ChatMessages from '@/components/ChatMessages';
import useGetUserChats from '@/hooks/useGetUserChats';
import { useAppSelector } from '@/store/hook';
import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChatList, IChatItemProps } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import './style/index.css';

function Message() {
  const currentUser = useAppSelector((state) => state.user);
  const [userChatList, setUserChatList] = useState<IChatItemProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<number>();
  const { data: allChats, isLoading } = useGetUserChats({});

  useEffect(() => {
    if (!isLoading && allChats && allChats.length > 0) {
      const converted = convertChatlist(allChats, currentUser.id);

      setUserChatList(converted);
    }
  }, [allChats]);

  const changeSelectedChat = (chat: IChatItemProps) => {
    setSelectedChat(Number(chat.id));
  };

  return (
    <Flex height="88vh">
      <Box
        flex="1.5"
        p={4}
        overflowY="scroll"
        backgroundColor="#fff"
        borderRadius="12px"
      >
        <ChatList
          className="chat-list"
          dataSource={userChatList.map((chat) => ({
            ...chat,
            className: selectedChat === chat.id ? 'selected' : undefined,
          }))}
          id="chatlist"
          lazyLoadingImage=""
          onClick={changeSelectedChat}
        />
      </Box>

      <Box
        flex="4"
        p={4}
        overflowY="scroll"
        height="100%"
        flexDirection="column"
        display="flex"
        justifyContent="space-between"
        h="100%"
      >
        {selectedChat && <ChatMessages chatId={selectedChat} />}
      </Box>
    </Flex>
  );
}

export default Message;
