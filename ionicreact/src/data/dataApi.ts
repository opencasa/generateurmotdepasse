import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const DARKMODE = 'darkMode';

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
