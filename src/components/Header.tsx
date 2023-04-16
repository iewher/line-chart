import React from 'react';
import { Button } from './Button';

type HeaderProps = {
  onButtonClick: () => void;
};

/*
Через пропсы передаю метод onButtonClick, чтобы при нажатии на кнопку, менялось значение для обьекта с данными
*/

export default function Header({ onButtonClick }: HeaderProps) {
  return (
    <div className='header'>
      <h2>Период:</h2>
      <Button onClick={onButtonClick}>Построить график</Button>
    </div>
  );
}