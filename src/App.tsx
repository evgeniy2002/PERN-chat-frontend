import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './scss/App.scss';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Messages } from './components/Messages';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuthMe } from './redux/auth/slice';

// import socket from './socket';
import { FindUser } from './components/FindUsers';
import { Header } from './components/Header';
import { fetchFriends } from './redux/users/slice';
import socket from './socket';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => !!state.auth.user);
  const search = useAppSelector((state) => state.users.search);

  React.useEffect(() => {
    dispatch(checkAuthMe());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchFriends(search));
  }, [dispatch, search]);
  // const onClickSocket = () => {
  //   socket.emit('SEND_MESSAGE', { message: 'hello' });
  // };

  React.useEffect(() => {
    // socket.on('RECEIVE_MESSAGE', (data) => {
    //   alert(data);
    // });
    // socket.on('newClientConnect', (data) => {
    // return <h1>{data.decs}</h1>;
    // document.write(data.desc);
    // });
  }, []);

  React.useEffect(() => {
    if (!window.localStorage.getItem('token') && !isAuth) {
      navigate('/auth/login');
    }
  }, [isAuth]);

  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Messages />} />
          <Route path="/im/:id" element={<Messages />} />
          <Route path="/find" element={<FindUser />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
