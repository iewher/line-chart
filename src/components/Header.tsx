import React, { useState } from 'react';
import { Button } from './Button';
import SelectComponent from './SelectComponent'

/*
Указываем типы для HeaderProps
*/

type HeaderProps = {
  onButtonClick: () => void;
};

/*
Указываем типы для SelectProps
*/

type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

/*
Создаем реакт компонент Select, который создает выпадающий список с выбором
*/

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => (
  <select value={value} onChange={onChange}>
    {options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

/*
Создаем массив обьектов, каждый из которых предоставляет опцию выбора времени и даты
*/

const timeOptions = Array.from({ length: 168 }, (_, i) => {
  const date = new Date(Date.now() + i * 60 * 60 * 1000);
  const dateStr = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  return {
    value: `${dateStr} ${timeStr}`,
    label: `${dateStr} ${timeStr}`
  };
});

export default function Header({ onButtonClick }: HeaderProps) {

/*
Используем хук UseState для создания трех состояниий
*/
  
  const [startInterval, setStartInterval] = useState('');
  const [endInterval, setEndInterval] = useState('');
  const [selectedOption, setSelectedOption] = useState<{ value: string, label: string } | null>(null)

  const handleChange = (options: any) => {
      setSelectedOption(options)
  }

/*
СОздаем названия элементов для дропдаун списка
*/

  const directions = ['Направление 1', 'Направление 2', 'Направление 3', 'Направление 4', 'Направление 5'];

  const options = directions.map((direction, index) => ({
    value: `${index + 1}`,
    label: direction
  }));

  return (
    <div className='header'>
      <h2>Период:</h2>
      <h2 className='from'>с</h2>
      <Select 
        value={startInterval}
        onChange={(e) => setStartInterval(e.target.value)}
        options={timeOptions}
        />
      <h2 className='to'>до</h2>
      <Select 
        value={endInterval}
        onChange={(e) => setEndInterval(e.target.value)}
        options={timeOptions}
        />
      <h2 className='interval'>Интервал:</h2>
      <h2>Направления:</h2>
        <div className='Directions'>
          <SelectComponent 
          options={options}
          selectedOption={selectedOption}
          handleChange={handleChange}
          />
        </div>
        <Button onClick={onButtonClick}>Построить</Button>
    </div>
  );
}