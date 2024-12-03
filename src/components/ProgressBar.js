import React from 'react';
import '../css/ProgressBar.css';

const ProgressBar = ({ formValues, fields }) => {
  const totalFields = fields.length; 
  const filledFields = fields.filter(field => formValues[field.name]?.trim()).length; 

  const progressPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100); 

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progressPercentage}%` }}>
        <span>{progressPercentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
