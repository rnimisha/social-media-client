import { MessageType } from './message.types';
import { ParticipantType } from './participants.types';

export type ChatType = {
  id: number;
  createdAt: Date;
  participants: ParticipantType[];
  messages: MessageType[];
};

export default ChatType;
