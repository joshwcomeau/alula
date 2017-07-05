import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import RotateLeftIcon from 'react-icons/lib/md/rotate-left';
import RotateRightIcon from 'react-icons/lib/md/rotate-right';
import UndoIcon from 'react-icons/lib/md/undo';
import RestoreIcon from 'react-icons/lib/md/delete';

import {colors, media, styles} from '../constants';
import {getCanUndo} from '../reducers/history.reducer';
import {
  undoTransformation,
  rotateCW,
  rotateCCW,
  restoreOriginalImage,
} from '../actions';

import Button from './Button';
import {Row, IconAdjustment} from './utility-components';


const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: ${styles.paddingUnitPx};
  background: ${styles.backgroundColor};
  color: ${styles.textColor};
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.05);
`;

class BottomControls extends PureComponent {
  static propTypes = {
    canUndo: PropTypes.bool.isRequired,
    undoTransformation: PropTypes.func.isRequired,
  }

  handleRestore = () => {
    const msg = 'This will reset the image to its original state! Are you sure?';

    // eslint-disable-next-line no-restricted-globals
    if (confirm(msg)) {
      this.props.restoreOriginalImage();
    }
  }

  render() {
    const {
      canUndo,
      undoTransformation,
      rotateCW,
      rotateCCW,
    } = this.props;

    return (
      <Wrapper>
        <Row>
          <Button
            width={styles.buttonHeightPx}
            color={colors.reds[2]}
            borderColor={colors.reds[3]}
            onClick={this.handleRestore}
          >
            <IconAdjustment><RestoreIcon /></IconAdjustment>
          </Button>

          <Button
            width={styles.buttonHeightPx}
            color={colors.pinks[1]}
            borderColor={colors.pinks[2]}
            onClick={rotateCCW}
            style={{ marginLeft: styles.paddingUnit }}
          >
            <IconAdjustment><RotateLeftIcon /></IconAdjustment>
          </Button>
          <Button
            width={styles.buttonHeightPx}
            color={colors.pinks[1]}
            borderColor={colors.pinks[2]}
            onClick={rotateCW}
            style={{ marginLeft: styles.paddingUnit }}
          >
            <IconAdjustment><RotateRightIcon /></IconAdjustment>
          </Button>

          <Button
            color={colors.purples[1]}
            borderColor={colors.purples[2]}
            onClick={undoTransformation}
            disabled={!canUndo}
            style={{ flex: 1, marginLeft: styles.paddingUnit }}
          >
            <IconAdjustment><UndoIcon /></IconAdjustment>
          </Button>
        </Row>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  canUndo: getCanUndo(state),
});

const mapDispatchToProps = {
  undoTransformation,
  rotateCW,
  rotateCCW,
  restoreOriginalImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomControls);
