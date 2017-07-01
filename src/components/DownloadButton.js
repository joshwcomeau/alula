import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import SaveIcon from 'react-icons/lib/md/save';

import {openModal} from '../actions';
import {colors, styles, isMobile} from '../constants';
import {getCurrentCanvas} from '../reducers/history.reducer';

import Button from './Button';
import {Modal, IconAdjustment} from './utility-components';


const DownloadButtonElem = Button.extend`
  border-color: ${colors.greens[2]};
  color: ${colors.greens[2]};
  width: ${styles.buttonHeightPx};
  height: ${styles.buttonHeightPx};
`;

class DownloadButton extends PureComponent {
  render() {
    const {openModal} = this.props;

    return (
      <DownloadButtonElem onClick={() => openModal('download')}>
        <IconAdjustment>
          <SaveIcon />
        </IconAdjustment>
      </DownloadButtonElem>
    )
  }
}

const mapStateToProps = state => ({
  canvas: getCurrentCanvas(state),
});

const mapDispatchToProps = {openModal};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
