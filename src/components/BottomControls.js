import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import UndoIcon from 'react-icons/lib/md/undo';
import ClearIcon from 'react-icons/lib/md/delete';

import {undoTransformation} from '../actions';
import {colors, media, styles} from '../constants';
import {getCanUndo} from '../reducers/history.reducer';

import Button from './Button';
import {Row} from './utility-components';


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

const IconAdjustment = styled.span`
  display: inline-block;
  transform: translateY(-1px);
`;

const RotateButton = Button.extend`
  margin-left: ${styles.paddingUnitPx};
  width: ${styles.buttonHeightPx};
  height: ${styles.buttonHeightPx};
  color: ${colors.pinks[1]};
  border-color: ${colors.pinks[2]};
  font-size: 22px;
`;

const UndoButton = Button.extend`
  height: ${styles.buttonHeightPx};
  color: ${colors.purples[1]};
  border-color: ${colors.purples[2]};
  margin-left: ${styles.paddingUnitPx};
  flex: 1;
`;

const ClearButton = Button.extend`
  height: ${styles.buttonHeightPx};
  width: ${styles.buttonHeightPx};
  color: ${colors.reds[2]};
  border-color: ${colors.reds[3]};
`;

class BottomControls extends PureComponent {
  static propTypes = {
    canUndo: PropTypes.bool.isRequired,
    undoTransformation: PropTypes.func.isRequired,
  }

  render() {
    const {canUndo, undoTransformation} = this.props;

    return (
      <Section>
        <Row>
          <ClearButton>
            <IconAdjustment><ClearIcon /></IconAdjustment>
          </ClearButton>

          <RotateButton>
            <IconAdjustment><RotateLeftIcon /></IconAdjustment>
          </RotateButton>
          <RotateButton>
            <IconAdjustment><RotateRightIcon /></IconAdjustment>
          </RotateButton>

          <UndoButton
            onClick={undoTransformation}
            disabled={!canUndo}
          >
            <IconAdjustment><UndoIcon /></IconAdjustment>
          </UndoButton>
        </Row>
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  canUndo: getCanUndo(state),
});

const mapDispatchToProps = {undoTransformation}

export default connect(mapStateToProps, mapDispatchToProps)(BottomControls);
