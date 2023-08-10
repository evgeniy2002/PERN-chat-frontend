import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/auth/slice';
import { Link } from 'react-router-dom';

import no_user from '../../assets/icons/no-user.svg';

export const Header = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.user);

  const [popup, setPopup] = React.useState(false);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <header className="messages-chat__header">
      <Link to={'/'} className="messages-chat__header-title">
        GlowChat
      </Link>
      <div className="messages-chat__header_img" onClick={() => setPopup(!popup)}>
        <h2>{auth?.fullName}</h2>
        <img src={auth?.avatar ? auth.avatar : no_user} alt="" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Bold"
          viewBox="0 0 24 24"
          width="15"
          height="15">
          <path d="M6.414,9H17.586a1,1,0,0,1,.707,1.707l-5.586,5.586a1,1,0,0,1-1.414,0L5.707,10.707A1,1,0,0,1,6.414,9Z" />
        </svg>
        {popup && (
          <div className="messages-chat__header_img_logout" onClick={onClickLogout}>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="15"
                  height="15">
                  <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                  <path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z" />
                </svg>
                Настройки
              </li>

              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15">
                  <g id="_01_align_center" data-name="01 align center">
                    <path d="M2,21V3A1,1,0,0,1,3,2H8V0H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H8V22H3A1,1,0,0,1,2,21Z" />
                    <path d="M23.123,9.879,18.537,5.293,17.123,6.707l4.264,4.264L5,11l0,2,16.443-.029-4.322,4.322,1.414,1.414,4.586-4.586A3,3,0,0,0,23.123,9.879Z" />
                  </g>
                </svg>
                Выйти
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
