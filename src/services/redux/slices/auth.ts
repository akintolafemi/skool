import { createSlice } from '@reduxjs/toolkit'
import { ImageSource } from 'expo-image';
import { produce } from 'immer';
import { APP_TOKEN } from 'src/constants/app.constants';
import SecureStoreManager from 'src/utils/SecureStoreManager';

const initialAuthState: {
  user: {
    id: number | null,
    firstname: string,
    lastname: string,
    avatar?: ImageSource
  }
} = {
  user: {
    id: null,
    firstname: ``,
    lastname: ``
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    populateUserData: (state, action) => {
      state = produce(state, draft => {
        draft.user = action?.payload || state.user
      })
      return state;
    },
    logout: (state) => {
      SecureStoreManager.removeItemFromSecureStore(`${APP_TOKEN}`).then(() => {

      }).catch((error) => {
        console.log(error)
      })
      state = {
        ...state,
        user: {
          ...state.user,
          id: null,
        }
      }
      return state;
    }
  },
})

// Action creators are generated for each case reducer function
export const { populateUserData, logout } = authSlice.actions

export default authSlice.reducer