import React from 'react';
import PropTypes from 'prop-types';
import s from './Layout.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout = ({ children }) => (
  <div className={s.root}>
    <div>{children}</div>
  </div>
);

Layout.propTypes = propTypes;
export default Layout;
