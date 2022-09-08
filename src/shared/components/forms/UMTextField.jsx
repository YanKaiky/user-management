import { FC, useEffect, useState } from 'react';
import { useField } from '@unform/core';
import { TextField, TextFieldProps } from '@mui/material';

type IUMTextFieldProps = TextFieldProps & {
  name: string;
}

export const UMTextField: FC<IUMTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || '');


  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={() => error ? clearError() : false}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />);
};
