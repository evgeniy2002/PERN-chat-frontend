// import appSlice  from './app/slice';

import { configureStore } from "@reduxjs/toolkit";
import authSlice  from './auth/slice';
import userSlice  from './users/slice';
import dialogSlice  from './dialogs/slice';
import messageSlice  from './messages/slice';

export const store = configureStore({
  reducer: {
   auth: authSlice,
   users: userSlice,
   dialogs: dialogSlice,
   messages: messageSlice,
  }
})

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch