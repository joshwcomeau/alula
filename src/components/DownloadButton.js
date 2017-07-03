import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import SaveIcon from 'react-icons/lib/md/save';

import {clickDownloadButton} from '../actions';
import {colors, styles} from '../constants';
import {getCurrentCanvas} from '../reducers/history.reducer';

import Button from './Button';
import {IconAdjustment} from './utility-components';


class DownloadButton extends PureComponent {
  render() {
    const {width, clickDownloadButton} = this.props;

    return (
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
    )
  }
}

const mapStateToProps = state => ({
  canvas: getCurrentCanvas(state),
});

const mapDispatchToProps = {clickDownloadButton};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
