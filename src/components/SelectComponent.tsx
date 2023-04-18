import React from 'react'
import Select from 'react-select'

type OptionType = {
    value: string
    label: string
};

type SelectProps = {
    options: OptionType[];
    selectedOption: OptionType | null;
    handleChange: (selectedOption: OptionType | null) => void;
};

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