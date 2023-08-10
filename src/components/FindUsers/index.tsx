import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { User } from '../../redux/users/types';
import { fetchNewDialog } from '../../redux/dialogs/slice';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';
import instance from '../../axios';

export const FindUser = () => {
  const [countDialogs, setCountDialogs] = React.useState(0);
  const navigate = useNavigate();
  const users: User[] = useAppSelector((state) => state.users.users);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const createNewDialog = (dialog: User) => {
    if (user) {
      const newDialog = {
        userId: user.id,
        partnerId: dialog.id,
      };
      dispatch(fetchNewDialog(newDialog));
      socket.emit('DIALOGS:JOIN', newDialog.partnerId);
    }

    navigate('/');
  };

  // React.useEffect(() => {
  //   instance.get<number>('/count').then(({ data }) => {
  //     setCountDialogs((prev) => data + 1);
  //   });
  // }, []);

  return (
    <div className="find">
      <div className="find-field">
        <input type="text" placeholder="Поиск друзей" />
        <button>Find</button>
      </div>
      <div className="find-list">
        {users
          .filter((item) => item.id !== user?.id)
          .map((user) => (
            <div className="find-list_item">
              <div className="find-list_item-info">
                <div className="find-list_item-info__img">
                  <img
                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdvTWqkzSoHhR0mijr-KvytfFYSjjbq2zH2A&usqp=CAU"
                    src={
                      user.avatar
                        ? user.avatar
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgYHQLH78Sqfe1-DHsMWe_BVKgWmxj293lw&usqp=CAU'
                    }
                    alt=""
                  />
                </div>
                <h3 className="find-list_item-info_name">{user.fullName}</h3>
              </div>
              <span className="find-list_item_message" onClick={() => createNewDialog(user)}>
                Написать сообщение
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
