import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SaveIcon from 'react-icons/lib/md/save';

import {openModal} from '../actions';
import {colors, styles, isMobile} from '../constants';
import {getCurrentCanvas} from '../reducers/history.reducer';

import Button from './Button';
import {Modal, IconAdjustment} from './utility-components';


const DownloadButtonElem = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${styles.buttonHeightPx};
  height: ${styles.buttonHeightPx};
  padding: 0;
  border-radius: 2px;
  border-width: 2px;
  border-style: solid;
  border-color: ${colors.greens[2]};
  font-size: 18px;
  font-weight: 400;
  background: rgba(0,0,0,0.5);
  color: ${colors.greens[2]};
`;

class DownloadButton extends PureComponent {
  image = new Image()

  componentDidUpdate() {
    this.image = new Image();
    this.image.src = this.props.canvas.toDataURL("image/png");
    console.log('Did update')
  }

  handleClick = ev => {
    const {openModal} = this.props;

    // Sadly, iOS (and maybe Android?) doesn't support downloading.
    // The best we can do is draw the canvas to an image, and tell the user
    // to press-hold to save. This is done via a modal, that we open for mobile
    // users.
    if (isMobile) {
      ev.preventDefault();

      openModal('download');
      return;
    }
  }

  render() {
    return (
      <DownloadButtonElem
        onClick={this.handleClick}
        href={this.image.src}
        download="aztec-created-image.png"
      >
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
