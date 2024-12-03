import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import ProgressBar from './ProgressBar';
import '../css/SuccessAnimation.css'; 

const FormRenderer = ({ fields, onSubmit }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); 

  useEffect(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = '';
    });
    setFormValues(initialValues);
  }, [fields]);

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {
      onSubmit(formValues);
      setSuccess(true); 
      setTimeout(() => {
        setSuccess(false); 
        setFormValues({}); 
      }, 5000); 
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleFormSubmit} className="form">
          {fields.map((field, index) => (
            <div key={index}>
              <FormField 
                field={field} 
                value={formValues[field.name] || ''} 
                onChange={handleChange} 
              />
              {errors[field.name] && (
                <p className="error">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <button type="submit" className="submit-button">Submit</button>
        </form>

        <ProgressBar formValues={formValues} fields={fields} />

        {success && (
          <div className="success-animation">
            <div className="checkmark">✓</div>
            <p>Form Submitted Successfully!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FormRenderer;
