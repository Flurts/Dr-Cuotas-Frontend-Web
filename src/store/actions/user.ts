import { createAction } from '@reduxjs/toolkit';

import { Doctor, User } from '@/types';

const chargeUser = createAction<{ user: User; jwt: string }>('user/chargeUser');
const chargeDoctor = createAction<{ doctor: Doctor }>('user/chargeDoctor');
const logoutUser = createAction('user/logoutUser');
const activateUser = createAction('user/activateUser');
const updateUser = createAction<{ user: Partial<User> }>('user/updateUser');
const updateProfileImage = createAction<{ profileImage: string }>(
  'user/updateProfileImage',
);

export {
  activateUser,
  chargeDoctor,
  chargeUser,
  logoutUser,
  updateProfileImage,
  updateUser,
};
