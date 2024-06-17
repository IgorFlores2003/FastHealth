import React from 'react';
import './index.css';

const RequiredField = ({ children }) => {
  return (
    <label>
      {children} <span className="required-asterisk">*</span>
    </label>
  );
};

export default RequiredField;
