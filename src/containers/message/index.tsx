import { convertChatlist } from '@/common/utils';
import ChatMessages from '@/components/ChatMessages';
import useGetUserChats from '@/hooks/useGetUserChats';
import { useAppSelector } from '@/store/hook';
import { Box, Button, Flex, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChatList, IChatItemProps } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

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
      <Box flex="1.5" p={4} overflowY="scroll">
        <ChatList
          className="chat-list"
          dataSource={userChatList}
          id="chatlist"
          lazyLoadingImage=""
          onClick={changeSelectedChat}
        />
      </Box>

      <Box
        flex="4"
        p={4}
        overflowY="scroll"
        position="relative"
        height="100%"
        backgroundColor="pink.100"
        flexDirection="column"
        justifyContent="space-between"
      >
        {selectedChat && <ChatMessages chatId={selectedChat} />}
      </Box>
    </Flex>
  );
}

export default Message;
