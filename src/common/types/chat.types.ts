import AppMessageType from './message.types';
import { ParticipantType } from './participants.types';

export type ChatType = {
  id: number;
  createdAt: Date;
  participants: ParticipantType[];
  messages: AppMessageType[];
};

export default ChatType;
