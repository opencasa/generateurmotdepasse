import { CharacterActions } from './character.actions';
import { CharacterState } from './character.state';

export const characterReducer = (state: CharacterState, action: CharacterActions): CharacterState => {
  switch (action.type) {
    case 'set-data': {
      return { ...state, ...action.data };
    }
    case 'set-character-replacement': {
      console.log(`before ${action.id} ${action.replace} ${JSON.stringify(state.characters[action.id])}`);
     /* return {
        ...state, characters: [
          ...state.characters.map(
          (content, i) => i === action.id ? { ...content, selected: action.replace }
            : content)
        ]
      };*/
      return {
        ...state, characters: [
          ...state.characters.map(
          (content, i) => i === 0 ? { ...content, selected: action.replace }
            : content)
        ]
      };
    }
  }
}
