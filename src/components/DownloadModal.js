import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {CSSTransitionGroup} from 'react-transition-group';
import styled from 'styled-components';

import {closeModal} from '../actions';
import {colors, styles, isMobile} from '../constants';
import {getCurrentCanvas} from '../reducers/history.reducer';

import Button from './Button';
import Spinner from './Spinner';
import {Modal} from './utility-components';


class DownloadModal extends PureComponent {
  state = {
    imageData: null,
  }

  componentWillReceiveProps(nextProps) {
    const isAboutToBeTriggered = (
      !this.props.isSelectedModal &&
      nextProps.isSelectedModal
    );

    const isAboutToBeHidden = (
      this.props.isSelectedModal &&
      !nextProps.isSelectedModal
    );

    if (isAboutToBeTriggered) {
      // Allow a brief pause, so that the image can be parsed.
      window.setTimeout(() => {
        this.setState({
          imageData: this.props.canvas.toDataURL('image/png'),
        });
      }, enterTimeout + 100);
    }

    if (isAboutToBeHidden) {
      this.setState({ imageData: null });
    }
  }

  render() {
    const {isSelectedModal, closeModal} = this.props;
    const {imageData} = this.state;

    const copy = isMobile
      ? <span><strong>Press and hold</strong> on the image above, and select <strong>"Save Image"</strong></span>
      : <span><strong>Right-click</strong> the image above, and select <strong>"Save Image As"</strong></span>;

    return (
      <TransitionGroup>
        {isSelectedModal && (
          <DownloadModalElem key="modal">
            <ImageContainer>
              {imageData ? <Image src={imageData} /> : <Spinner />}
            </ImageContainer>

            <Instructions>
              {copy}
            </Instructions>

            <Button
              fill
              width="100%"
              color={colors.blues[2]}
              onClick={closeModal}
              style={{
                maxWidth: 300,
                margin: `${styles.paddingUnitPx} auto`,
              }}
            >
              Done
            </Button>
          </DownloadModalElem>
        )}
      </TransitionGroup>
    );
  }
}

const DownloadModalElem = Modal.extend`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: ${window.innerWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.25);
`;

const Image = styled.img`
  width: 100%;
`;

const Instructions = styled.div`
  flex: 1;
  font-size: 18px;
  text-align: center;
  margin: ${styles.paddingUnit * 2}px;
`

const enter = 'download-modal-enter';
const enterActive = 'download-modal-enter-active';
const leave = 'download-modal-leave';
const leaveActive = 'download-modal-leave-active';
const enterTimeout = 500;
const leaveTimeout = 500;

const TransitionGroup = styled(CSSTransitionGroup).attrs({
  transitionName: { enter, enterActive, leave, leaveActive },
  transitionEnterTimeout: enterTimeout,
  transitionLeaveTimeout: leaveTimeout,
})`
  .${enter} {
    transform: translateY(100%);
  }

  .${enterActive} {
    transform: translateY(0);
    transition: transform ${enterTimeout}ms ease-in;
  }

  .${leave} {
    transform: translateY(0);
  }

  .${leaveActive} {
    transform: translateY(100%);
    transition: transform ${leaveTimeout}ms ease-in;
  }
`;

const mapStateToProps = state => ({
  isSelectedModal: state.modal === 'download',
  canvas: getCurrentCanvas(state),
});

const mapDispatchToProps = {closeModal};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadModal);
