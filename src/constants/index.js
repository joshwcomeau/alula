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

export const greens = [
  '#C8E6C9',
  '#81C784',
  '#4CAF50',
  '#388E3C',
  '#1B5E20',
];

export const grays = [
  '#F5F5F5',
  '#E0E0E0',
  '#9E9E9E',
  '#616161',
  '#212121',
  '#171717',
];

export const white = '#FFFFFF';

export const colors = {reds, pinks, purples, blues, greens, grays, white};


// Media queries
const orientations = ['portrait', 'landscape'].reduce((acc, orientation) => ({
  ...acc,
  [orientation]: (...args) => css`
    @media (orientation: ${orientation}) {
      ${css(...args)}
    }
  `
}), {});

export const media = {
  ...orientations,
  // Special breakpoint for iPhone 5 sized devices
  xs: (...args) => css`
    @media (max-width: 320px) {
      ${css(...args)}
    }
  `
};


// Shared style variables
const backgroundColor = colors.grays[4];
const textColor = colors.white;
const paddingUnit = 14;
const buttonHeight = 60;
const buttonHeightXS = 45;
const barHeight = buttonHeight + paddingUnit * 2;
const barHeightXS = buttonHeightXS + paddingUnit * 2;

export const styles = {
  barHeight,
  barHeightPx: `${barHeight}px`,
  barHeightXS,
  barHeightXSPx: `${barHeightXS}px`,
  backgroundColor,
  textColor,
  paddingUnit,
  paddingUnitPx: `${paddingUnit}px`,
  buttonHeight,
  buttonHeightPx: `${buttonHeight}px`,
  buttonHeightXS,
  buttonHeightXSPx: `${buttonHeightXS}px`,
};

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
  navigator.userAgent
);
