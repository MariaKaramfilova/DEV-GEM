import React, { useCallback, useState } from "react";
import { Alert, Box, List, Stack, SvgIcon } from '@mui/joy';
import _ from 'lodash';

import { useDropzone } from "react-dropzone";
import "./Dropzone.css";
import DividedList from "../../views/DividedList/DividedList.tsx";

interface DropzoneComponentProps {
  setFiles: (file: File[] | void[]) => void[];
  validateValue: (value: string, type: string) => Promise<string | null>;
}

export interface Preview {
  caption: string;
  name: string;
  type: string;
}

/**
 * A component for handling file uploads using a dropzone.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setFile - A callback function to set the selected file.
 * return (
 *   <DropzoneComponent setFile={handleSetFile} />
 * );
 */
export default function DropzoneComponent({
  setFiles,
  validateValue
}: DropzoneComponentProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview[] | void[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);

    acceptedFiles.map(async (file) => {

      const data = await validateValue(file.name, 'Image');

      if (data) {
        setError(data);
        return;
      }

      if (
        file.type.split("/")[1] !== "gif" &&
        file.type.split("/")[1] !== "png" &&
        file.type.split("/")[1] !== "jpeg"
      ) {
        setError("Invalid file type!");
        return;
      }

      if (file.size <= 0) {
        setError("Cannot upload empty file!");
        return;
      } else if (file.size > 1048576000) {
        setError("Max file size is 10MB");
        return;
      }

      setFiles((prev) => {
        const updated = [...prev];
        updated.push(file);
        return updated;
      })


      const url = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setPreview((prev) => {
          const newImage = {
            caption: url,
            name: file.name,
            type: file.type.split("/")[0]
          }
          const updated = [...prev];
          updated.push(newImage);
          return updated;
        });
      };
    })
  }, []);

  const renderUploadedPreview = preview.map(image => {
    return <DividedList key={crypto.randomUUID()} {...image} setFiles={setFiles} />
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDragEventsBubbling: false,
    maxSize: 1048576000,
    multiple: true,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack
        className="align-items-center justify-content-center text-center d-flex flex-column dropzone"
        sx={{ minHeight: "15vh", minWidth: "60%", alignItems: 'center' }}
      >
        <SvgIcon sx={{marginBottom: 0}}>
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
        <p style={{fontSize: "0.9em", marginBottom: "0.2em", marginTop: "0.4em"}}>Click to upload extra images for your addon description or drag and drop them.</p>
        <p style={{ fontSize: "0.7em", marginTop: 0 }}>
          Allowed file types: PNG, JPG, GIF up to 100MB
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        {!(_.isEmpty(preview)) && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              minWidth: 'fit-content',
              gap: 2
            }}
          >
            <List
              variant="outlined"
              sx={{
                minWidth: 'fit-content',
                borderRadius: 'sm',
              }}
            >
              {renderUploadedPreview}
            </List>
          </Box>
        )}
      </Stack>
    </div>
  )
}
