/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createReducer } from '@reduxjs/toolkit';

import {
  chargeDoctor,
  chargeUser,
  logoutUser,
  updateProfileImage,
  updateUser,
} from '@/store';
import { User } from '@/types';

interface UserState {
  isLoggedIn: boolean;
  user: User;
  jwt: string;
}

export const initialState: UserState = {
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  user: {} as User,
  jwt: '',
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateUser, (state, action) => {
    state.user = { ...state.user, ...action.payload.user };
  });
  builder.addCase(chargeUser, (state, action) => {
    state.isLoggedIn = true;
    state.user = action.payload.user;
    state.jwt = action.payload.jwt;
  });
  builder.addCase(chargeDoctor, (state, action) => {
    state.user.doctor = action.payload.doctor;
  });
  builder.addCase(logoutUser, (state) => {
    state.isLoggedIn = false;
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    state.user = {} as User;
    state.jwt = '';
  });
  builder.addCase(updateProfileImage, (state, action) => {
    state.user.profile_picture = action.payload.profileImage;
  });
});
