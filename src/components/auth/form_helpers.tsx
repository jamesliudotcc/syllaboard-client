import * as React from 'react';

// Define stateless component to render input and errors
export const renderTextField = ({input, type, label, meta: {touched, error}, ...custom}: any): any => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      {...input}
      {...custom}
    />

    {touched && error && <span className="error">{error}</span>}
  </div>
);
