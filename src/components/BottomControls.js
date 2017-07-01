import React, {PureComponent} from 'react';
import styled from 'styled-components';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import UndoIcon from 'react-icons/lib/md/undo';
import ClearIcon from 'react-icons/lib/md/delete';

import {colors, media, styles} from '../constants';

import Button from './Button';

const rotateButtonSizePx = '60px';
const bottomButtonSizePx = '50px';

const Section = styled.div`
  position: relative;
  z-index: 2;
  padding: ${styles.paddingUnitPx};
  background: ${styles.backgroundColor};
  color: ${styles.textColor};
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
  margin-left: ${styles.paddingUnitPx};
  width: ${rotateButtonSizePx};
  height: ${rotateButtonSizePx};
  font-size: 22px;
`;

const PhotoDetails = styled.div`
  padding: ${styles.paddingUnitPx};
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

  ${media.xs`
    display: none;
  `}
`;

const PhotographerName = styled.p`
  font-size: 14px ;
  font-weight: normal;
`

const BottomRow = styled.div`
  display: flex;
`

const UndoButton = Button.extend`
  height: ${bottomButtonSizePx};
  color: ${colors.pinks[1]};
  border-color: ${colors.pinks[2]};
  margin-left: ${styles.paddingUnitPx};
  flex: 1;
`;

const ClearButton = Button.extend`
  height: ${bottomButtonSizePx};
  width: ${bottomButtonSizePx};
  color: ${colors.reds[2]};
  border-color: ${colors.reds[3]};
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
