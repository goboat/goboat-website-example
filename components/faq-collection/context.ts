import React from 'react';

interface FaqContextType {
  searchString: string;
}

const defaultValue = {
  searchString: '',
};

export const FaqContext = React.createContext<FaqContextType>(defaultValue);
