import { MessageType } from 'react-chat-elements';
import { ChatType, ParticipantType } from '../types';

const findParticipantNameFromId = (
  messages: ChatType,
  id: number
): ParticipantType | undefined =>
  messages.participants.find((user) => user.id === id);

const getPosition = (currUser: number, user: number): 'left' | 'right' =>
  currUser === user ? 'right' : 'left';

export const convertMessagelist = (
  messages: ChatType,
  currUserId: number
): MessageType[] => {
  const convertMsg = messages.messages.map((msg) => {
    const userDetail = findParticipantNameFromId(messages, msg.senderId);
    const position = getPosition(currUserId, msg.senderId);
    return {
      type: 'text',
      text: msg.content,
      date: msg.createdAt,
      position,
      id: msg.id,
      title: userDetail?.username || '',
      focus: false,
      titleColor: '#6096B4',
      forwarded: false,
      replyButton: false,
      removeButton: false,
      //   status: 'sent',
      //   notch: false,
      //   retracted: false,
    };
  });

  return convertMsg as MessageType[];
};

export default convertMessagelist;
