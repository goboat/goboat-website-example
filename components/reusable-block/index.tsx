import React from 'react';

interface ReusableBlockProps {
  children: any;
}

const ReusableBlock = (props: ReusableBlockProps) => {
  return props.children;
};

export default ReusableBlock;
