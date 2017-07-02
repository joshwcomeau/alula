import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import SaveIcon from 'react-icons/lib/md/save';

import {openModal} from '../actions';
import {colors, styles} from '../constants';
import {getCurrentCanvas} from '../reducers/history.reducer';

import Button from './Button';
import {IconAdjustment} from './utility-components';


class DownloadButton extends PureComponent {
  render() {
    const {width, openModal} = this.props;

    return (
      <Button
        color={colors.greens[2]}
        borderColor={colors.greens[3]}
        width={width}
        onClick={() => openModal('download')}
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

const mapDispatchToProps = {openModal};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
