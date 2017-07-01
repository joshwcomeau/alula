import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {CSSTransitionGroup} from 'react-transition-group';
import styled from 'styled-components';

import {closeModal} from '../actions';

import Button from './Button';
import {Modal} from './utility-components';


class DownloadModal extends PureComponent {
  render() {
    const {isOpen, closeModal} = this.props;

    return (
      <TransitionGroup>
        {isOpen && (
          <Modal key="modal">
            <img ref={elem => this.img = elem} />

            <p>
              Press and hold on the image above, and select "Save Image".
            </p>

            <Button onClick={closeModal}>Done</Button>
          </Modal>
        )}
      </TransitionGroup>
    );
  }
}

const enter = 'download-modal-enter';
const enterActive = 'download-modal-enter-active';
const leave = 'download-modal-leave';
const leaveActive = 'download-modal-leave-active';
const enterTimeout = 250;
const leaveTimeout = 250;

const TransitionGroup = styled(CSSTransitionGroup).attrs({
  transitionName: { enter, enterActive, leave, leaveActive },
  transitionEnterTimeout: enterTimeout,
  transitionLeaveTimeout: leaveTimeout,
})`
  .${enter} {
    opacity: 0.01;
  }

  .${enterActive} {
    opacity: 1;
    transition: opacity ${enterTimeout}ms ease-in;
  }

  .${leave} {
    opacity: 1;
  }

  .${leaveActive} {
    opacity: 0.01;
    transition: opacity ${leaveTimeout}ms ease-in;
  }
`;

const mapStateToProps = state => ({
  isOpen: state.modal === 'download',
});

const mapDispatchToProps = {closeModal};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadModal);
