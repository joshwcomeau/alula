import { css } from 'styled-components'


// Colors
export const reds = [
  '#FFCDD2',
  '#E57373',
  '#F44336',
  '#D32F2F',
  '#B71C1C',
];

export const pinks = [
  '#F8BBD0',
  '#F06292',
  '#E91E63',
  '#C2185B',
  '#880E4F',
];


export const purples = [
  '#E1BEE7',
  '#BA68C8',
  '#9C27B0',
  '#7B1FA2',
  '#4A148C',
];

export const blues = [
  '#C5CAE9',
  '#7986CB',
  '#3F51B5',
  '#303F9F',
  '#1A237E',
];

export const grays = [
  '#F5F5F5',
  '#E0E0E0',
  '#9E9E9E',
  '#9E9E9E',
  '#212121',
];

export const white = '#FFFFFF';

export const colors = {reds, pinks, purples, blues, grays, white};

// Media queries
const orientations = ['portrait', 'landscape'].reduce((acc, orientation) => ({
  ...acc,
  [orientation]: (...args) => css`
    @media (orientation: ${orientation}) {
      ${css(...args)}
    }
  `
}), {});

export const media = {...orientations};
