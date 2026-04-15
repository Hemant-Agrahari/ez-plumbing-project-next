import React from 'react';
import Select from 'react-select';

const Dropdown = ({ options, onChange, placeholder, disabled, value, className, isMulti = false }: any) => {
  const getValue = () => {
    if (isMulti) {
      return value || [];
    }
    return value || null;
  };

  return (
    <div className={className}>
      <Select
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        value={getValue()}
        isMulti={isMulti}
        isDisabled={disabled}
      />
    </div>
  );
};

export default Dropdown;
