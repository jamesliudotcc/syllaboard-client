import * as React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
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
    <TextField type={type} label={label} {...input} {...custom} />
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
}: any): any => {
  const menuItems = options.map((option: any, i: number) => (
    <MenuItem key={i} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
          {...input}
          {...custom}
          inputProps={{
            name,
            id: name,
          }}
          onBlur={() => {
            return;
          }}
        >
          {menuItems}
        </Select>
        {touched && error && <span>{error}</span>}
      </FormControl>
    </div>
  );
};

// 'list,of, things in, a string, , ,hi' -> ['list','of','things in','a string','hi']
export const commaListParser = (input: string) => (
  input
    .split(',')
    .map(item=> item.trim())
    .filter(item => !!item)
);
