import { createSelector } from 'reselect';
import { Character } from '../models/Character';
import { AppState } from './state';
const getCharacters = (state: AppState) => state.data.characters;

export const getCharacterData = createSelector(
  getCharacters,
  (characters) => {
    const characterReplacements: { [key: string]: Character[] } = {};

    characters.forEach(character => {
      character.replacements && character.replacements.forEach(id => {
        if (characterReplacements[id]) {
          characterReplacements[id].push(character);
        } else {
          characterReplacements[id] = [character];
        }
      })
    });
    return characterReplacements;
  }
);
