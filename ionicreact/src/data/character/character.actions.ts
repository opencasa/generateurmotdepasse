import { setCharacterReplacementData } from '../dataApi';
import { ActionType } from '../../util/types';
import { CharacterState } from './character.state';

export const loadData = () => async (dispatch: React.Dispatch<any>) => {
  //const data = await getData();
 // dispatch(setData(data));getData,
}

export const setData = (data: Partial<CharacterState>) => ({
  type: 'set-data',
  data
} as const);

export const setCharacterReplacement = (id: number, replace: string) => async (dispatch: React.Dispatch<any>) => {
  await setCharacterReplacementData(id, replace);
  return ({
    type: 'set-character-replacement',
    id,
    replace
  } as const);
};

export type CharacterActions =
| ActionType<typeof setCharacterReplacement>
| ActionType<typeof setData>
