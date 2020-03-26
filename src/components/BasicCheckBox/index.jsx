import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

const defaultProps = {
  onChange: () => {},
  checked: false,
};

class BasicCheckBox extends React.PureComponent {
  render() {
    const { onChange, checked, ...rest } = this.props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <input type="checkbox" onChange={onChange} checked={checked} {...rest} />;
  }
}

BasicCheckBox.propTypes = propTypes;
BasicCheckBox.defaultProps = defaultProps;
export default BasicCheckBox;
