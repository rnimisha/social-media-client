import { IChatItemProps } from 'react-chat-elements';
import { BASEURL } from '@/constants';
import { ChatType } from '../types';
import IMG from '../../assets/images/noprofile.webp';

export const convertChatlist = (
  chatList: ChatType[],
  currUserId: number
): IChatItemProps[] => {
  const converted = chatList
    .filter((item) => item.messages.length > 0)
    .map((item) => {
      const anotherUser = item.participants.find(
        (user) => user.id !== currUserId
      );

      const avatar =
        anotherUser?.profilePic !== null
          ? `${BASEURL}/uploads/profile/${anotherUser?.profilePic}`
          : IMG;
      const alt = anotherUser?.name || '';
      const title = anotherUser?.username || '';
      const subtitle = item.messages.length > 0 ? item.messages[0].content : '';
      const date =
        item.messages.length > 0 ? item.messages[0].createdAt : new Date();

      return {
        avatar,
        alt,
        title,
        subtitle,
        date,
        unread: 0,
        lazyLoadingImage: '',
        id: item.id,
      };
    });
  const sortedByTime = converted.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sortedByTime;
};

export default convertChatlist;
