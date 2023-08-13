import React from 'react';

import send from '../../../assets/icons/send-message.svg';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout } from '../../../redux/auth/slice';
import instance from '../../../axios';
import { addMessage, fetchMessages } from '../../../redux/messages/slice';
import classNames from 'classnames';
import socket from '../../../socket';

import no_user from '../../../assets/icons/no-user.svg';
import no_message from '../../../assets/icons/no-message.svg';

export const Chat = () => {
  const [message, setMessage] = React.useState('');
  const { currentDialogId, roomId, partnerId, onlineUsers } = useAppSelector(
    (state) => state.dialogs,
  );
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const { messages, partnerName } = useAppSelector((state) => state.messages);

  const onNewMessage = (data: any) => {
    dispatch(addMessage(data));
  };

  const onAddMessage = async () => {
    // socket.emit('DIALOGS:NEW_MESSAGE', {
    //   roomId,
    //   text: message,
    //   userName: user?.fullName,
    // });

    try {
      const obj = {
        text: message,
        userId: user?.id,
        roomId,
      };
      await instance.post('/message', obj);
      // instance.post('/message', obj).then((data) => {
      //   console.log(data);
      // });
      // console.log(data);
      // dispatch(addMessage(data));
      // dispatch(fetchMessages(dialogId));

      setMessage('');

      // return data;
    } catch (error) {
      console.log('Не удалось отправить сообщение', error);
    }
  };
  React.useEffect(() => {
    socket.on('DIALOGS:NEW_MESSAGE', onNewMessage);
    return () => {
      socket.removeListener('DIALOGS:NEW_MESSAGE', onNewMessage);
    };
  }, []);
  return (
    <div className="messages-chat">
      {currentDialogId ? (
        <>
          <div className="messages-chat_info">
            <h3 className="messages-chat_info-name">{partnerName}</h3>
            {partnerId && onlineUsers.includes(partnerId) ? (
              <p className="messages-chat_info-online">online</p>
            ) : (
              <p className="messages-chat_info-offline">offline</p>
            )}
          </div>
          <div className="messages-chat_content">
            {messages.map((message: any) => (
              <div
                className={classNames('messages-chat_content-item', {
                  me: user?.id !== message.user?.id,
                })}>
                <div className="messages-chat_content-item__img ">
                  {/* <img src={message.user.avatar ? message.user.avatar : no_user} alt="" /> */}
                </div>
                <div className="messages-chat_content-item_about">
                  <h3 className="messages-chat_content-item_about_name">
                    {message.user?.fullName}
                  </h3>

                  <span>10:00</span>
                  <p className="messages-chat_content-item_about_message">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="messages-chat-send">
            <input
              type="text"
              placeholder="Сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={onAddMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="20"
                height="20">
                <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <div className="messages-chat_empty">
          <img src={no_message} alt="" />
          <div className="messages-chat_empty_interview">Выберите собеседника</div>
          <p>
            Чтобы начать переписку, выберите собеседника слева в списке или воспользуйтесь поиском.
          </p>
        </div>
      )}
    </div>
  );
};
