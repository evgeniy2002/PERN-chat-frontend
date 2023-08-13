import React from 'react';
import { ibg } from '../../../utils/ibg';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import instance from '../../../axios';
import {
  setDialogs,
  setCurrentDialogId,
  fetchNewDialog,
  setRoomId,
  setPartnerId,
  setOnlineUsers,
} from '../../../redux/dialogs/slice';
import socket from '../../../socket';
import debounce from 'lodash.debounce';

import no_user from '../../../assets/icons/no-user.svg';
import search from '../../../assets/icons/search.svg';
import { setSearch } from '../../../redux/users/slice';
import { User } from '../../../redux/users/types';
import UserLoader from '../../../utils/loader';
import { setPartnerName } from '../../../redux/messages/slice';
import { on } from 'events';
import classNames from 'classnames';

export const People = () => {
  const [value, setInputValue] = React.useState('');
  const [partId, setPartId] = React.useState(0);
  // const location = useLocation();
  const dispatch = useAppDispatch();
  const { roomId, dialogs, onlineUsers } = useAppSelector((state) => state.dialogs);
  const { users, status } = useAppSelector((state) => state.users);
  const user = useAppSelector((state) => state.auth.user);
  // const [onlineUsers, setOnlineUsers] = React.useState<number[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data: dialogs } = await instance.get('/im', {
          params: {
            partnerId: partId,
            userId: user?.id,
          },
        });
        // console.log(data);
        if (dialogs.hasOwnProperty('existingDialogId')) {
          const { dialogs: conversations } = dialogs;
          // console.log(conversations);
          // const { existingDialogId, dialogs: conversations } = dialogs;

          dispatch(setDialogs(conversations));
          dispatch(setRoomId(dialogs.existingDialogId));
          // const { roomId, conversations } = dialogs;
          // console.log({ roomId, conversations });
        } else {
          dispatch(setDialogs(dialogs));
        }
      } catch (error) {
        console.log(error);
      }
    })();
    ibg();
  }, [partId, user?.id]);

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 500),
    [],
  );

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  const createConversations = (partnerId: number) => {
    if (user) {
      const newDialog = {
        userId: user.id,
        partnerId,
      };
      dispatch(fetchNewDialog(newDialog));
      dispatch(setSearch(''));

      setInputValue('');
    }
  };
  const getDialogId = ({
    dialogId,
    partnerId,
    name,
  }: {
    dialogId: number;
    partnerId: number;
    name: string;
  }) => {
    socket.emit('DIALOGS:JOIN', roomId);
    // socket.emit('DIALOGS:JOIN', dialogId);
    // const id = location.pathname.split('/').pop();
    dispatch(setCurrentDialogId(dialogId));
    dispatch(setPartnerName(name));
    setPartId(partnerId);

    dispatch(setPartnerId(partnerId));
  };

  const setOnline = (data: any) => {
    dispatch(setOnlineUsers(data));
  };

  React.useEffect(() => {
    socket.on('USER:STATUS', setOnline);

    return () => {
      socket.removeListener('USER:STATUS', setOnline);
    };
  }, []);

  return (
    <div className="messages-people">
      <div className="messages-people_search">
        <input
          type="text"
          placeholder="Поиск..."
          value={value}
          onChange={(e) => handleInputValue(e)}
        />
        {/* <Link to="/find"> */}
        <div className="messages-people_search__svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            className=""
            viewBox="0 0 24 24"
            width="17"
            height="17">
            <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
          </svg>
        </div>

        {/* </Link> */}
      </div>
      <div className="messages-people_friends">
        {status === 'loading'
          ? [...new Array(5)].map((_, idx) => <UserLoader key={idx} />)
          : Array.isArray(users) &&
            users
              .filter((item) => item.id !== user?.id)
              .map((item) => (
                <p
                  className="messages-people_friends__item"
                  onClick={() => createConversations(item.id)}>
                  # {item.fullName}
                </p>
              ))}
      </div>

      <div className="messages-people_content">
        {dialogs.map((item: any) => (
          <Link
            to={`/im/${item.id}`}
            className="messages-people_content-item"
            onClick={() =>
              getDialogId({
                dialogId: item.id,
                partnerId: item.partnerId,
                name: item.Partner.fullName,
              })
            }>
            {/* {online && <p>Online</p>} */}

            <div
              className={classNames('messages-people_content-item__img', {
                online: onlineUsers.includes(item.Partner.id),
              })}>
              <img src={item.Partner?.avatar ? item.Partner.avatar : no_user} alt="" />
            </div>
            <div className="messages-people_content-body">
              <div className="messages-people_content-body_info">
                <h3 className="messages-people_content-body_title">{item.Partner?.fullName}</h3>
                <p className="messages-people_content-body_message">
                  Привет, как у тебя обстоят дела?
                </p>
              </div>
              <div className="messages-people_content-body_general">
                <p className="messages-people_content-body_time">10:00</p>
                <span className="messages-people_content-body_notification">1</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
// import React from 'react';
// import { ibg } from '../../../utils/ibg';
// import { Link, useLocation, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import instance from '../../../axios';
// import {
//   setDialogs,
//   setCurrentDialogId,
//   fetchNewDialog,
//   setPartnerId,
//   setRoomId,
// } from '../../../redux/dialogs/slice';
// import socket from '../../../socket';
// import debounce from 'lodash.debounce';

// import no_user from '../../../assets/icons/no-user.svg';
// import search from '../../../assets/icons/search.svg';
// import { setSearch } from '../../../redux/users/slice';
// import { User } from '../../../redux/users/types';
// import UserLoader from '../../../utils/loader';
// import { setOnlineUsers, setPartnerName } from '../../../redux/messages/slice';

// import classNames from 'classnames';

// export const People = () => {
//   const [value, setInputValue] = React.useState('');
//   // const [partId, setPartnerId] = React.useState(0);
//   // const location = useLocation();
//   const dispatch = useAppDispatch();
//   const { roomId, dialogs, partnerId } = useAppSelector((state) => state.dialogs);
//   const onlineUsers = useAppSelector((state) => state.messages.onlineUsers);
//   const { users, status } = useAppSelector((state) => state.users);
//   const user = useAppSelector((state) => state.auth.user);
//   // const [onlineUsers, setOnlineUsers] = React.useState<number[]>([]);

//   React.useEffect(() => {
//     (async () => {
//       try {
//         const { data: dialogs } = await instance.get('/im', {
//           params: {
//             partnerId,
//             userId: user?.id,
//           },
//         });
//         // console.log(data);
//         if (dialogs.hasOwnProperty('existingDialogId')) {
//           const { dialogs: conversations } = dialogs;
//           // console.log(conversations);
//           // const { existingDialogId, dialogs: conversations } = dialogs;

//           dispatch(setDialogs(conversations));
//           dispatch(setRoomId(dialogs.existingDialogId));
//           // const { roomId, conversations } = dialogs;
//           // console.log({ roomId, conversations });
//         } else {
//           dispatch(setDialogs(dialogs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//     ibg();
//   }, [partnerId, user?.id]);

//   const updateSearchValue = React.useCallback(
//     debounce((str) => {
//       dispatch(setSearch(str));
//     }, 500),
//     [],
//   );

//   const setOnline = (data: any) => {
//     console
//     dispatch(setOnlineUsers(data));
//   };

//   const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//     updateSearchValue(e.target.value);
//   };
//   const createConversations = (partnerId: number) => {
//     if (user) {
//       const newDialog = {
//         userId: user.id,
//         partnerId,
//       };
//       dispatch(fetchNewDialog(newDialog));
//       dispatch(setSearch(''));

//       setInputValue('');
//       // socket.emit('DIALOGS:JOIN', newDialog.partnerId);
//     }
//   };
//   const getDialogId = ({
//     dialogId,
//     partnerId,
//     name,
//   }: {
//     dialogId: number;
//     partnerId: number;
//     name: string;
//   }) => {
//     socket.emit('DIALOGS:JOIN', roomId);
//     // socket.emit('DIALOGS:JOIN', dialogId);
//     // const id = location.pathname.split('/').pop();
//     dispatch(setCurrentDialogId(dialogId));
//     dispatch(setPartnerName(name));

//     dispatch(setPartnerId(partnerId));
//     // setPartnerId(partnerId);

//     // dispatch(setPartnerId(partnerId));
//   };
//   React.useEffect(() => {
//     // socket.on('connect', () => {
//     //   console.log('user');
//     //   setOnline(true);
//     // });

//     // socket.on('disconnect', () => {
//     //   console.log('Disconnected from server');
//     //   setOnline(false);
//     // });
//     socket.on('USER:STATUS', setOnline);
//   }, []);

//   return (
//     <div className="messages-people">
//       <div className="messages-people_search">
//         <input
//           type="text"
//           placeholder="Поиск..."
//           value={value}
//           onChange={(e) => handleInputValue(e)}
//         />
//         {/* <Link to="/find"> */}
//         <div className="messages-people_search__svg">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             id="Outline"
//             className=""
//             viewBox="0 0 24 24"
//             width="17"
//             height="17">
//             <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
//           </svg>
//         </div>

//         {/* </Link> */}
//       </div>
//       <div className="messages-people_friends">
//         {status === 'loading'
//           ? [...new Array(5)].map((_, idx) => <UserLoader key={idx} />)
//           : Array.isArray(users) &&
//             users
//               .filter((item) => item.id !== user?.id)
//               .map((item) => (
//                 <p
//                   className="messages-people_friends__item"
//                   onClick={() => createConversations(item.id)}>
//                   # {item.fullName}
//                 </p>
//               ))}
//       </div>

//       <div className="messages-people_content">
//         {dialogs.map((item: any) => (
//           <Link
//             to={`/im/${item.id}`}
//             className="messages-people_content-item"
//             onClick={() =>
//               getDialogId({
//                 dialogId: item.id,
//                 partnerId: item.partnerId,
//                 name: item.Partner.fullName,
//               })
//             }>
//             {/* {online && <p>Online</p>} */}

//             <div
//               className={classNames('messages-people_content-item__img', {
//                 online: onlineUsers.includes(item.Partner.id),
//               })}>
//               <img src={item.Partner?.avatar ? item.Partner.avatar : no_user} alt="" />
//             </div>
//             <div className="messages-people_content-body">
//               <div className="messages-people_content-body_info">
//                 <h3 className="messages-people_content-body_title">{item.Partner?.fullName}</h3>
//                 <p className="messages-people_content-body_message">
//                   Привет, как у тебя обстоят дела?
//                 </p>
//               </div>
//               <div className="messages-people_content-body_general">
//                 <p className="messages-people_content-body_time">10:00</p>
//                 <span className="messages-people_content-body_notification">1</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };
