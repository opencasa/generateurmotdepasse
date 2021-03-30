import { createSelector } from 'reselect';
import { AppState } from './state';

export const mapCenter = (state: AppState) => {
  
    return {
      id: 1,
      name: 'Map Center',
      lat: 43.071584,
      lng: -89.380120
    };
  
}
