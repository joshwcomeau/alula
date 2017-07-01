import styled from 'styled-components';

import {media} from '../constants';


export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
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
