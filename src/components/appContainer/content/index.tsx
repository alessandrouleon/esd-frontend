import React from 'react';
import {BoxStyled} from '../styles';

interface ContentProps {
  children: React.ReactNode;
}

export function Content({children}: ContentProps) {
  return <BoxStyled>{children}</BoxStyled>;
}
