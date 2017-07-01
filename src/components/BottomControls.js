import React, {PureComponent} from 'react';
import styled from 'styled-components';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import UndoIcon from 'react-icons/lib/md/undo';
import ClearIcon from 'react-icons/lib/md/delete';

import {colors} from '../constants';

import Button from './Button';


const Section = styled.div`
  position: relative;
  z-index: 2;
  padding: 14px;
  background: ${colors.white};
  color: ${colors.grays[4]};
  box-shadow: 0px -1px 1px rgba(0,0,0,0.15);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
`

const IconAdjustment = styled.span`
  display: inline-block;
  transform: translateY(-1px);
`;

const RotateButton = Button.extend`
  margin-left: 14px;
  width: 60px;
  height: 60px;
  font-size: 22px;
`;

const PhotoDetails = styled.div`
  padding: 14px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhotographTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PhotographerName = styled.p`
  font-size: 14px;
  font-weight: normal;
`

const BottomRow = styled.div`
  display: flex;
`

const UndoButton = Button.extend`
  height: 60px;
  background: ${colors.blues[2]};
  margin-left: 14px;
  flex: 1;
`;

const ClearButton = Button.extend`
  height: 60px;
  width: 60px;
  background: ${colors.reds[2]};
`;

class BottomControls extends PureComponent {
  handleClear() {

  }

  handleSave() {

  }

  render() {
    return (
      <Section>
        <TopRow>
          <RotateButton>
            <IconAdjustment><RotateLeftIcon /></IconAdjustment>
          </RotateButton>

          <RotateButton>
            <IconAdjustment><RotateRightIcon /></IconAdjustment>
          </RotateButton>
        </TopRow>

        <PhotoDetails>
          <PhotographTitle>Some Sort of Plant Photo With a really goddamn long name wow o long</PhotographTitle>
          <PhotographerName>By Rodrigo Galvaderez</PhotographerName>
        </PhotoDetails>

        <BottomRow>
          <ClearButton>
            <IconAdjustment><ClearIcon /></IconAdjustment>
          </ClearButton>

          <UndoButton>
            <IconAdjustment><UndoIcon /></IconAdjustment>
          </UndoButton>
        </BottomRow>
      </Section>
    )
  }
}

export default BottomControls;
