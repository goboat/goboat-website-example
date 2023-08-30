import React, { FC } from 'react';
import { useStore } from '../hooks';

const ViewportSubscribe: FC = () => {
  function updateViewport() {
    const newViewport = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    useStore.setState({
      viewport: newViewport,
    });
  }
  React.useEffect(() => {
    updateViewport();
    addEventListener('resize', updateViewport, false);
    return () => {
      removeEventListener('resize', updateViewport);
    };
  }, []);

  return null;
};

export default ViewportSubscribe;
