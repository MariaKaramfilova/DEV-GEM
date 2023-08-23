import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Input from '@mui/joy/Input';
import { FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';
import ErrorHelper from '../../views/ErrorHelper/ErrorHelper.tsx';

interface Props {
  inputLabel: string;
  inputPlaceholder: string;
  inputType: string;
  setValue: (value: string) => void;
  validateValue: (value: string) => string | null;
  isSubmitted: boolean;
  setSubmitError: Dispatch<SetStateAction<string | null>>;
}

export default function TextInputField(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    props.setValue(newValue);
    setCurrentValue(newValue);
    props.setSubmitError(null);
    setError(null);
  };

  useEffect(() => {
    if (props.isSubmitted) {
      const data = props.validateValue(currentValue);
      setError(data);
      props.setSubmitError(data);
    }
  }, [props.isSubmitted]);

  return (
    <FormControl>
      <FormLabel>{props.inputLabel}</FormLabel>
      <Input
        placeholder={props.inputPlaceholder}
        type={props.inputType}
        onChange={handleChange}
        value={currentValue}
        error={error ? true : undefined} />
      {error && props.isSubmitted &&
        <ErrorHelper error={error} />}
    </FormControl>
  );
}