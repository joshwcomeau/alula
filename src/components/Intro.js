import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {colors, styles, media} from '../constants';
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
          <MainContent>
            <span>
              <Title>alula</Title>
              <Beta>beta</Beta>
              <Subtitle>art via reflection</Subtitle>
            </span>

            <Container>
              <DemoGIF src={demoGIFUrl} />
            </Container>

            <ButtonContainer>
              <ImageUploader />
              <RandomImageSelector />
            </ButtonContainer>
          </MainContent>

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
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 750px;
`

const Title = styled.h1`
  font-size: 64px;
  font-weight: bold;
  letter-spacing: -2.5px;
  color: ${colors.white};
  margin-top: ${styles.paddingUnitPx};
  margin-bottom: 4px;
`;

const Subtitle = styled.h3`
  font-size: 16px;
  font-weight: normal;
  color: ${colors.grays[1]};
  margin-bottom: ${styles.paddingUnitPx};
`;

const Beta = styled.span`
  position: absolute;
  display: inline-block;
  top: 18px;
  margin-left: auto;
  margin-right: auto;
  font-size: 10px;
  font-weight: bold;
  color: ${colors.reds[2]};
  transform: translateX(200%);
`

const Container = styled.div`
  position: relative;
  width: 80%;
  height: 0;
  padding-bottom: 80%;
  margin-left: auto;
  margin-right: auto;

  ${media.xs`
    width: 70%;
    padding-bottom: 70%;
  `}
`;

const ButtonContainer = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  margin-top: ${styles.paddingUnitPx};
  margin-bottom: ${styles.paddingUnit * 2}px;

  ${media.xs`
    width: 70%;
  `}
`

const DemoGIF = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
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
