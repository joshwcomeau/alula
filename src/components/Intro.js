import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {colors, styles} from '../constants';
import demoGIFUrl from '../assets/demo-2.gif';

import ImageUploader from './ImageUploader';
import RandomImageSelector from './RandomImageSelector';


class Intro extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    return (
      <IntroElem>
        <Title>Aztec</Title>
        <Subtitle>Art via reflection</Subtitle>

        <Container>
          <DemoGIF src={demoGIFUrl} />
        </Container>

        <ButtonContainer>
          <ImageUploader />
          <RandomImageSelector />
        </ButtonContainer>
      </IntroElem>
    )
  }
}

const IntroElem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.grays[4]};
  text-align: center;
  color: ${colors.grays[0]};
`

const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  letter-spacing: -2.5px;
  color: ${colors.white};
  margin-top: ${styles.paddingUnitPx};
  margin-bottom: 6px;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  font-weight: normal;
  color: ${colors.grays[1]};
  margin-bottom: ${styles.paddingUnitPx};
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const ButtonContainer = Container.extend`
  margin-top: ${styles.paddingUnitPx};
  margin-bottom: ${styles.paddingUnit * 2}px;
`

const DemoGIF = styled.img`
  display: block;
  width: 100%;
  max-height: 40%;
  border-radius: 2px;
`

export default Intro;
