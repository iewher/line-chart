import React, { useState } from 'react';
import { Button } from './Button';

type HeaderProps = {
  onButtonClick: () => void;
};

type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => (
  <select value={value} onChange={onChange}>
    {options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const timeOptions = Array.from({ length: 24 }, (_, i) => ({
  value: `${i.toString().padStart(2, '0')}:00`,
  label: `${i.toString().padStart(2, '0')}:00`,
}));

export default function Header({ onButtonClick }: HeaderProps) {
  const [startInterval, setStartInterval] = useState('');
  const [endInterval, setEndInterval] = useState('');

  return (
    <div className='header'>
      <h2>Период:</h2>
      <h2 className='from'>с:</h2>
        <Select 
          value={startInterval}
          onChange={(e) => setStartInterval(e.target.value)}
          options={timeOptions}
        />
      <h2 className='to'>до:</h2>
        <Select 
          value={endInterval}
          onChange={(e) => setEndInterval(e.target.value)}
          options={timeOptions}
        />
      <h2 className='interval'>Интервал:</h2>
        <Button onClick={onButtonClick}>Построить график</Button>
      
    </div>
  );
}