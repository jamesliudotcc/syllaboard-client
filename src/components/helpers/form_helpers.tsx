import moment from 'moment';
import * as React from 'react';
import DatePicker from 'react-date-picker';
import Select from 'react-select';

// Define stateless component to render input and errors
export const renderTextField = ({
  input,
  type,
  label,
  meta: { touched, error },
  ...custom
}: any): any => (
  <div>
    <label>{label}</label>
    <input type={type} {...input} {...custom} />

    {touched && error && <span className="error">{error}</span>}
  </div>
);

export const renderDatePicker = ({
  input,
  placeholder,
  defaultValue,
  label,
  meta: { touched, error },
  ...custom
}: any): any => (
  <div>
    <label>{label}</label>
    <DatePicker
      {...input}
      {...custom}
      autoOk={true}
      dateForm="MM/DD/YYYY"
      onBlur={() => {
        return;
      }}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

export const renderDropdown = ({
  input,
  options,
  placeholder,
  defaultValue,
  label,
  meta: { touched, error },
  ...custom
}: any): any => (
  <div>
    <label>{label}</label>
    <Select
      options={options}
      {...input}
      {...custom}
      onBlur={() => {
        return;
      }}
    />
    {touched && error && <span>{error}</span>}
  </div>
);
