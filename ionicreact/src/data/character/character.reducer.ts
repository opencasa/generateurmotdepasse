import { CharacterActions } from './character.actions';
import { CharacterState } from './character.state';

export const characterReducer = (state: CharacterState, action: CharacterActions): CharacterState => {
  switch (action.type) {
    case 'set-data': {
      return { ...state, ...action.data };
    }
  }
}
