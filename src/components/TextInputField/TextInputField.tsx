import * as React from 'react';
import Input from '@mui/joy/Input';
import { FormControl, FormLabel } from '@mui/joy';

interface Props {
  inputLabel: string;
  inputPlaceholder: string;
  inputType: string;
  setValue: (value: string) => void;
}

export default function TextInputField(props: Props) {

  return (
    <FormControl>
      <FormLabel>{props.inputLabel}</FormLabel>
      <Input
        placeholder={props.inputPlaceholder}
        type={props.inputType}
        onChange={(e) => props.setValue(e.target.value)} />
    </FormControl>
  );
}