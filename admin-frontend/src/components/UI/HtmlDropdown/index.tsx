import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface HtmlDropdownProps {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
}

const HtmlDropdown: React.FC<HtmlDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  disabled,
  name,
  ...props
}) => {
  return (
    <select
      name={name}
      className={className}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(option => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
};

export default HtmlDropdown;
