import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";
import { User } from "./types";

export const fetchFriends = createAsyncThunk('users/fetchUsers', async (search: string) => {
  if(search.length){
    const {data: users} = await instance.get(`/friends?search=${search}`)
    
    return users
  }
})

const initialState = {
  users: [],
  search: '',
  status: ''
} as {users: User[], search: string, status: string}


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

    setSearch: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.users = action.payload
      state.status = 'loaded'
    })
    builder.addCase(fetchFriends.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.status = 'error'
    })
  }
})

export const {setSearch} = userSlice.actions

export default userSlice.reducer