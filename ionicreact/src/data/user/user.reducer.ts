import { UserActions } from './user.actions';
import { UserState } from './user.state';

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case 'set-user-data':
      return { ...state, ...action.data };
    case 'set-dark-mode':
      return { ...state, darkMode: action.darkMode };
  }
}
