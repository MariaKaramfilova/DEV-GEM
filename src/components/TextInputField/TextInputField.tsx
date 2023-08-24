import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Input from '@mui/joy/Input';
import { FormControl, FormLabel } from '@mui/joy';
import ErrorHelper from '../../views/ErrorHelper/ErrorHelper.tsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  inputLabel: string;
  inputPlaceholder: string;
  inputType: string;
  setValue: (value: string) => void;
  validateValue: (value: string) => string | null | Promise<string | null>;
  isSubmitted: boolean;
  setSubmitError: Dispatch<SetStateAction<Map<string, null | string>>>;
}

export default function TextInputField(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleQuillChange = (value: string) => {
    props.setValue(value);
    setCurrentValue(value);
  };

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
      {props.inputLabel !== "Description" ? (
        <Input
          placeholder={props.inputPlaceholder}
          type={props.inputType}
          onChange={handleChange}
          value={currentValue}
          error={error && props.isSubmitted ? true : undefined} />
      ) : (
        <ReactQuill theme="snow" value={currentValue} onChange={handleQuillChange} placeholder={props.inputPlaceholder} />
      )}
      {error && props.isSubmitted &&
        <ErrorHelper error={error} />}
    </FormControl>
  );
}