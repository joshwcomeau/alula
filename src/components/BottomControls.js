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

// const RotateButton = Button.extend`
//   margin-left: ${styles.paddingUnitPx};
//   width: ${styles.buttonHeightPx};
//   height: ${styles.buttonHeightPx};
//   color: ${colors.pinks[1]};
//   border-color: ${colors.pinks[2]};
//   font-size: 22px;
// `;
//
// const UndoButton = Button.extend`
//   height: ${styles.buttonHeightPx};
//   color: ${colors.purples[1]};
//   border-color: ${colors.purples[2]};
//   margin-left: ${styles.paddingUnitPx};
//   flex: 1;
// `;
//
// const RestoreButton = Button.extend`
//   height: ${styles.buttonHeightPx};
//   width: ${styles.buttonHeightPx};
//   color: ${colors.reds[2]};
//   border-color: ${colors.reds[3]};
// `;

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
      <Section>
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
      </Section>
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
