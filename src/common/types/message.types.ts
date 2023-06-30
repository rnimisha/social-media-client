export type AppMessageType = {
  id: number;
  content: string;
  createdAt: Date;
  senderId: number;
  chatId: number;
};

export default AppMessageType;
