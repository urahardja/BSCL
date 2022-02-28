import React from 'react';
import PropTypes from 'prop-types';

import { useSidebar } from '../../hooks/use-sidebar';

const Main = (props) => {
  const sidebar = useSidebar();

  let mainClass;
  if (sidebar.state === 'open') {
    mainClass =
      'absolute top-0 left-0 right-0 bg-gray-100 rounded-l-2xl rounded-r-2xl lg:rounded-r-none transition-margin duration-500 ease-in-out min-h-screen lg:ml-64 p-4 pt-24 z-0';
  }

  if (sidebar.state === 'close') {
    mainClass =
      'absolute top-0 left-0 right-0 bg-gray-100 rounded-l-2xl rounded-r-2xl lg:rounded-r-none transition-margin duration-500 ease-in-out min-h-screen p-4 pt-24 z-0';
  }

  if (sidebar.state === 'mini') {
    mainClass =
      'absolute top-0 left-0 right-0 bg-gray-100 rounded-l-2xl rounded-r-2xl lg:rounded-r-none transition-margin duration-500 ease-in-out min-h-screen ml-14 p-4 pt-24 z-0';
  }

  return <main className={mainClass}>{props.children}</main>;
};

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
    PropTypes.node
  ])
};

Main.defaultProps = {
  children: 'Main'
};

export default Main;
