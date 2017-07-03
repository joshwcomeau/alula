import styled from 'styled-components';

import {colors, media} from '../constants';


export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Flexed = styled.div`
  flex: 1;
`;

export const FullHeight = styled.div`
  height: 100%;
`;

export const LandscapeOnly = styled.div`
  ${media.portrait`
    display: none;
  `}
`;

export const PortraitOnly = styled.div`
  ${media.landscape`
    display: none;
  `}
`;

export const IconAdjustment = styled.span`
  display: inline-block;
  transform: translateY(-1px);
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.grays[1]};

  ${media.landscape`
    margin: auto;
    max-width: 500px;
  `}
`;
