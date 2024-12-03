import React from 'react';

const FormField = ({ field, value, onChange }) => {
  const handleChange = (e) => {
    onChange(field.name, e.target.value);
  };

  switch (field.type) {
    case 'text':
    case 'number':
    case 'password':
    case 'date':
      return (
        <div>
          <label>{field.label}</label>
          <input
            type={field.type}
            value={value}
            onChange={handleChange}
            required={field.required}
          />
        </div>
      );
    case 'dropdown':
      return (
        <div>
          <label>{field.label}</label>
          <select value={value} onChange={handleChange} required={field.required}>
            <option value="">Select</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return null;
  }
};

export default FormField;
