import React, { useCallback, useState } from "react";
import { Alert, Box, Button, FormControl, FormHelperText, FormLabel, List, Stack, SvgIcon, styled } from '@mui/joy';
import _ from 'lodash';

import { useDropzone } from "react-dropzone";
import "./Dropzone.css";
import DividedList from "../../views/DividedList/DividedList.tsx";

interface DropzoneComponentProps {
  setFiles: (file: File[] | void[]) => void[];
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
}: DropzoneComponentProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview[] | void[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);

    acceptedFiles.map(file => {

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
    accept: "image/png, image/jpeg, image/gif",
    maxSize: 1048576000
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack
        className="align-items-center justify-content-center text-center d-flex flex-column dropzone"
        style={{ minHeight: "30vh" }}
      >
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
        <p>Click to upload files or drag and drop.</p>
        <p style={{ fontSize: "0.8em" }}>
          Allowed file types: PNG, JPG, GIF up to 100MB
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        {!(_.isEmpty(preview)) && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4
            }}
          >
            <List
              variant="outlined"
              sx={{
                minWidth: 240,
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
