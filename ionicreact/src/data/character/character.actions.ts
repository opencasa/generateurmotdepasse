import { getData } from '../dataApi';
import { ActionType } from '../../util/types';
import { CharacterState } from './character.state';

export const loadData = () => async (dispatch: React.Dispatch<any>) => {
  const data = await getData();
  dispatch(setData(data));
}

export const setData = (data: Partial<CharacterState>) => ({
  type: 'set-data',
  data
} as const);



export type CharacterActions =
  | ActionType<typeof setData>
