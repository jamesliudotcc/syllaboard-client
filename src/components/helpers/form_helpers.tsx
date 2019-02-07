import * as React from 'react';
import Select from 'react-select';

import TextField from '@material-ui/core/TextField'

import { DatePicker } from 'material-ui-pickers';


// Define stateless component to render input and errors
export const renderTextField = ({
  input,
  type,
  label,
  meta: { touched, error },
  ...custom
}: any): any => (
  <div>
    <TextField
      type={type}
      label={label}
      {...input}
      {...custom}
    />
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
    <DatePicker
      label={label}
      {...input}
      {...custom}
      autoOk={true}
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
