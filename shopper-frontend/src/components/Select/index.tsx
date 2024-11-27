import React from 'react';

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; name: string }[];
  errors?: string;
}

export default function Select  ({
                                         id,
                                         label,
                                         value,
                                         onChange,
                                         options,
                                         errors,
                                       }: SelectProps)  {
  return (
    <div className="mb-4 h-24">
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
          errors ? 'border-red-500 ring-red-300' : 'focus:ring-blue-300'
        }`}
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </div>
  );
};

