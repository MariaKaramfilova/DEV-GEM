import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Input from '@mui/joy/Input';
import { FormControl, FormLabel } from '@mui/joy';
import ErrorHelper from '../../views/ErrorHelper/ErrorHelper.tsx';

interface Props {
  inputLabel: string;
  inputPlaceholder: string;
  inputType: string;
  setValue: (value: string) => void;
  validateValue: (value: string) => string | null | Promise<string | null>;
  isSubmitted: boolean;
  setSubmitError: Dispatch<SetStateAction<Map<string, null | string> > >;
}

export default function TextInputField(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    props.setValue(newValue);
    setCurrentValue(newValue);
  };
  
  useEffect(() => {
    (async () => {
      const data = await props.validateValue(currentValue);
      setError(data);
      props.setSubmitError((prev) => prev.set(props.inputLabel, data));
    })();
  });


  return (
    <FormControl>
      <FormLabel>{props.inputLabel}</FormLabel>
      <Input
        placeholder={props.inputPlaceholder}
        type={props.inputType}
        onChange={handleChange}
        value={currentValue}
        error={error && props.isSubmitted ? true : undefined} />
      {error && props.isSubmitted &&
        <ErrorHelper error={error} />}
    </FormControl>
  );
}