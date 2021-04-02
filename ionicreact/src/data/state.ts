import { combineReducers } from './combineReducers';
import { characterReducer } from './character/character.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    characters: []
  },
  user: {
    darkMode: false
  }
};

export const reducers = combineReducers({
  data: characterReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;
