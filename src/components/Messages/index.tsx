import React from 'react';
import { People } from './People';
import { Chat } from './Chat';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { addMessage, fetchMessages } from '../../redux/messages/slice';
import socket from '../../socket';

export const Messages: React.FC = () => {
  const { roomId, currentDialogId } = useAppSelector((state) => state.dialogs);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (roomId) {
      dispatch(fetchMessages(roomId));
    }
  }, [roomId, dispatch]);

  const onAddMessage = (message: any) => {
    dispatch(addMessage(message));
  };

  return (
    <div className="messages">
      <People />
      <Chat />
    </div>
  );
};
