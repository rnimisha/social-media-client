import { BASEURL } from '@/constants';
import { io } from 'socket.io-client';

export const socket = io(BASEURL);

export default socket;
