import React from 'react';
import { SectionContextType } from './types';

const defaults: SectionContextType = {
  backgroundType: 'transparent',
  backgroundValue: 'light',
  textColor: 'dark',
};

const SectionContext = React.createContext<SectionContextType>(defaults);

export default SectionContext;
