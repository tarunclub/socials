import { selector } from 'recoil';
import { userState } from '../atoms/userAtom';

export const userName = selector({
  key: 'userName',
  get: ({ get }) => {
    const user = get(userState);
    return user.name;
  },
});

export const userEmail = selector({
  key: 'userEmail',
  get: ({ get }) => {
    const user = get(userState);
    return user.email;
  },
});

export const userProfilePicture = selector({
  key: 'userProfilePicture',
  get: ({ get }) => {
    const user = get(userState);
    return user.profilePicture;
  },
});

export const userId = selector({
  key: 'userId',
  get: ({ get }) => {
    const user = get(userState);
    return user.id;
  },
});
