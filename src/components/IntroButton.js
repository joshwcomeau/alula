import React from 'react';

import Button from './Button';


const IntroButton = (props) => (
  <Button
    width="100%"
    {...props}
    style={{
      ...props.style,
      position: 'relative',
      zIndex: 1,
    }}
  />
);

IntroButton.defaultProps = {
  style: {},
};

export default IntroButton;
