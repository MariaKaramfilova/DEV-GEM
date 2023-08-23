import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Button, FormControl, FormHelperText, FormLabel, SvgIcon, styled } from '@mui/joy';
import ErrorHelper from '../../views/ErrorHelper/ErrorHelper.tsx';

const FormInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
interface Props {
  setValue: (value: File) => void;
  validateValue: (value: string) => string | null;
  isSubmitted: boolean;
  setSubmitError: Dispatch<SetStateAction<string | null>>;
}

const UploadInput = (props: Props) => {
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(file);
      
      props.setSubmitError(null);
      setError(null);
      setFileName(file.name);
      props.setValue(file);
    }
  };

  useEffect(() => {
    if (props.isSubmitted) {
      const data = props.validateValue(fileName);
      setError(data);
      props.setSubmitError(data);
    }
  }, [props.isSubmitted]);

  return (
    <FormControl>
      <FormLabel>Plugin file</FormLabel>
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
        sx={{
          borderColor: error && props.isSubmitted ? 'var(--joy-palette-danger-outlinedBorder, var(--joy-palette-danger-300, #F09898));' : undefined,
        }}
      >
        {fileName || 'Upload a file'}
        <FormInput
          type="file"
          onChange={handleFileChange}
          accept=".jar,.zip" />
      </Button>
      {error && props.isSubmitted ?
        (<ErrorHelper error={error}/>
        ) : (
          <FormHelperText>.jar or .zip format</FormHelperText>
        )}
    </FormControl>
  )
}

export default UploadInput