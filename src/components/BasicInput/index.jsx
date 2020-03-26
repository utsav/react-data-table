import React from 'react';
import PropTypes from 'prop-types';
import s from './BasicInput.module.scss';

const propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  onChange: () => {},
  value: '',
};

class BasicInput extends React.PureComponent {
  render() {
    const { onChange, value, ...rest } = this.props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <input className={s.root} onChange={onChange} value={value} {...rest} />;
  }
}

BasicInput.propTypes = propTypes;
BasicInput.defaultProps = defaultProps;
export default BasicInput;
