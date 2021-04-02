import { Plugins } from '@capacitor/core';
import { Character } from '../models/Character';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';

const DARKMODE = 'darkMode';

export const getData = async () => {
  const response = await Promise.all([
    fetch(dataUrl)]);
  const responseData = await response[0].json();
  const characters = responseData.characters as Character[];

  const data = {
    characters
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: DARKMODE })]);
  const darkMode = await response[0].value === 'true';

  const data = {
    darkMode
  }
  return data;
}

export const setDarkModeData = async (darkMode: boolean) => {
  await Storage.set({ key: DARKMODE, value: JSON.stringify(darkMode) });
}
