import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext.ts'
import UploadInput from '../UploadInput/UploadInput.tsx';
import TextInputField from '../TextInputField/TextInputField.tsx';
import SelectCreatable from '../SelectCreatable/SelectCreatable.tsx';
import { Button, FormControl, FormLabel, Stack } from '@mui/joy';
import { getAllTags, getTagsForAddon } from '../../services/tag.services.ts';
import { getAllIDEs, getIDEsForAddon } from '../../services/IDE.services.ts';
import { IDEs, TAGS } from '../../common/common.ts';
import { isValidDescription, isValidFile, isValidIDE, isValidNameLength, isValidOriginLink, isValidTag } from './createAddonValidations.ts';

export default function CreateAddon() {
  const { loggedInUser } = useContext(AuthContext);
  const [addonFile, setAddonFile] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [originLink, setOriginLink] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [IDE, setIDE] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = () => {
    setIsSubmitted(true);
    if (submitError) {
      return;
    }
  }

  /**
   * Handle change event for the Tags component.
   * @param {Array} e - The selected tags.
   */
  const handleTagsChange = (e: string[]) => {
    setTags(e);
  };

  /** 
   * Handle change event for the IDEs component.
   * @param {Array} e - The selected IDE.
   */
  const handleIDEChange = (values: string[]) => {
    setIDE(values);
  };

  return (
    <Stack spacing={2}>
      <h3>Upload addons for IDEs</h3>
      <UploadInput
        setValue={setAddonFile}
        setSubmitError={setSubmitError}
        isSubmitted={isSubmitted}
        validateValue={isValidFile} />
      <TextInputField setValue={setName}
        inputType="text"
        inputPlaceholder="Enter unique name"
        inputLabel="Name"
        setSubmitError={setSubmitError}
        isSubmitted={isSubmitted}
        validateValue={isValidNameLength} />
      <TextInputField setValue={setOriginLink}
        inputType="text"
        inputPlaceholder="https://"
        inputLabel="Source code URL"
        isSubmitted={isSubmitted}
        validateValue={isValidOriginLink}
        setSubmitError={setSubmitError} />
      <TextInputField setValue={setDescription}
        inputType="text"
        inputPlaceholder="Add details"
        inputLabel="Description"
        isSubmitted={isSubmitted}
        validateValue={isValidDescription}
        setSubmitError={setSubmitError} />
      <FormControl>
        <FormLabel>Tags</FormLabel>
        <SelectCreatable
          changeValues={handleTagsChange}
          getAllValues={getAllTags}
          getValuesForAddon={getTagsForAddon}
          type={TAGS}
          setSubmitError={setSubmitError}
          isSubmitted={isSubmitted}
          validateValue={isValidTag} />
      </FormControl>
      <FormControl>
        <FormLabel>Target IDE</FormLabel>
        <SelectCreatable
          changeValues={handleIDEChange}
          getAllValues={getAllIDEs}
          getValuesForAddon={getIDEsForAddon}
          type={IDEs}
          setSubmitError={setSubmitError}
          isSubmitted={isSubmitted}
          validateValue={isValidIDE} />
      </FormControl>
      <Button
        type="submit"
        className="mt-3"
        onClick={handleSubmit}
      >
        Create post
      </Button>
    </Stack>
  )
}