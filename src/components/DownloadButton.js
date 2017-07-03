import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SaveIcon from 'react-icons/lib/md/save';

import {clickDownloadButton} from '../actions';
import {colors, styles, media} from '../constants';
import {getCurrentCanvas} from '../reducers/history.reducer';

import Button from './Button';
import {IconAdjustment} from './utility-components';


class DownloadButton extends PureComponent {
  render() {
    const {width, clickDownloadButton} = this.props;

    return (
      <InvisibleOnLandscape>
        <Button
          color={colors.greens[2]}
          borderColor={colors.greens[3]}
          width={width}
          onClick={clickDownloadButton}
        >
          <IconAdjustment>
            <SaveIcon />
          </IconAdjustment>
        </Button>
      </InvisibleOnLandscape>
    )
  }
}

// We don't want to show the button on landscape.
// We still want to render it, though, to avoid breaking the layout.
const InvisibleOnLandscape = styled.div`
  ${media.landscape`
    opacity: 0;
    pointer-events: none;
  `}
`;

const mapStateToProps = state => ({
  canvas: getCurrentCanvas(state),
});

const mapDispatchToProps = {clickDownloadButton};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
