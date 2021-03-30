import { getUserData, setDarkModeData } from '../dataApi';
import { ActionType } from '../../util/types';
import { UserState } from './user.state';

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  const data = await getUserData();
  dispatch(setData(data));
}


export const setDarkMode = (darkMode: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setDarkModeData(darkMode);
  return ({
    type: 'set-dark-mode',
    darkMode
  } as const);
}
export const setData = (data: Partial<UserState>) => ({
  type: 'set-user-data',
  data
} as const);
export type UserActions =
  | ActionType<typeof setData>
  | ActionType<typeof setDarkMode>
