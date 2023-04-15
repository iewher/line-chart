import React from 'react';
import { Button } from './Button';

type HeaderProps = {
  onButtonClick: () => void;
};

export default function Header({ onButtonClick }: HeaderProps) {
  return (
    <div className='header'>
      <Button onClick={onButtonClick}>Построить график</Button>
    </div>
  );
}