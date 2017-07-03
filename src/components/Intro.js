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
      <Background>
        <Wrapper>
          <span>
            <Title>Aztec</Title>
            <Subtitle>Art via reflection</Subtitle>
          </span>

          <Container>
            <DemoGIF src={demoGIFUrl} />
          </Container>

          <ButtonContainer>
            <ImageUploader />
            <RandomImageSelector />
          </ButtonContainer>

          <Footer>
            © 2017-present. A thing by
            {' '}
            <Link href="https://github.com/joshwcomeau">Joshua Comeau</Link>.
          </Footer>
        </Wrapper>
      </Background>
    );
  }
}

const Background = styled.div`
  height: 100%;
  background-color: ${colors.grays[4]};
`

const Wrapper = styled.div`
  height: 100%;
  max-width: 450px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin-left: auto;
  margin-right: auto;
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
`;

const Footer = styled.footer`
  margin: ${styles.paddingUnitPx};
  font-size: 12px;
  color: ${colors.white}
`;

const Link = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: ${colors.blues[1]};
`;

export default Intro;
