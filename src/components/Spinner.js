import React from 'react';
import styled, {keyframes} from 'styled-components';

import {colors} from '../constants';


const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const RotatingSVG = styled.svg`
  animation: ${rotate360} 1s linear infinite;
`;

const Spinner = ({ size = 50, color = colors.white }) => (
  <RotatingSVG
    width={size}
    height={size}
    viewBox="0 0 100 100"
  >
    <circle
      cx="50"
      cy="50"
      r="46"
      stroke={color}
      strokeWidth={8}
      fill="none"
      strokeDasharray="240"
    />
  </RotatingSVG>
);

export default Spinner;
