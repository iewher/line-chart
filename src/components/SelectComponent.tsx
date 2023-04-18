import React from 'react'
import Select from 'react-select'

/*
Указываем типы для OptionType
*/

type OptionType = {
    value: string
    label: string
};

/*
Указываем типы для SelectProps
*/

type SelectProps = {
    options: OptionType[];
    selectedOption: OptionType | null;
    handleChange: (selectedOption: OptionType | null) => void;
};

/*
Создаем реакт компонент SelectComponent, который создает дропдаун список для направлений,
далее вызываем его в хедере
*/

const SelectComponent: React.FC<SelectProps> = ({
    options,
    selectedOption,
    handleChange,
}) => {
    return (
        <Select options={options} value={selectedOption} onChange={handleChange} />
    );
};

export default SelectComponent;