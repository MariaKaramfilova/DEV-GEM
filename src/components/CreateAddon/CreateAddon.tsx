import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext.ts'
import UploadInput from '../UploadInput/UploadInput.tsx';
import TextInputField from '../TextInputField/TextInputField.tsx';
import SelectCreatable from '../SelectCreatable/SelectCreatable.tsx';
import { Button, FormControl, FormLabel, Stack } from '@mui/joy';
import { getAllTags, getTagsForAddon, updateTags } from '../../services/tag.services.ts';
import { getAllIDEs, getIDEsForAddon, updateIDEs } from '../../services/IDE.services.ts';
import { IDEs, SUCCESS_UPLOAD_PATH, TAGS } from '../../common/common.ts';
import { isValidCompany, isValidDescription, isValidFile, isValidIDE, isValidNameLength, isValidOriginLink, isValidTag } from './createAddonValidations.ts';
import { createAddon, updateAddonTags } from '../../services/addon.services.ts';
import Error from '../../views/Error/Error.tsx';
import Loading from '../../views/Loading/Loading.tsx';
import { useNavigate } from 'react-router-dom';

export default function CreateAddon() {
  const { loggedInUser } = useContext(AuthContext);
  const [addonFile, setAddonFile] = useState<Blob | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [originLink, setOriginLink] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [IDE, setIDE] = useState<string[]>([]);
  const [company, setCompany] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (submitError) {
      return;
    }
    try {
      if (addonFile) {
        const blob = new Blob([addonFile], {
          type: "application/json",
        });
        setLoading(true);
        const addon = await createAddon(name, description, IDE[0], blob, 'loggedInUser.uid', originLink, company);
        navigate(SUCCESS_UPLOAD_PATH);
        console.log(blob);
  
        await updateAddonTags(addon.addonId, tags);
        await updateTags(tags);
        await updateIDEs(IDE);
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (submitError) {
    return <Error error={submitError} />
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
      <TextInputField setValue={setCompany}
        inputType="text"
        inputPlaceholder="Enter name"
        inputLabel="Company"
        isSubmitted={isSubmitted}
        validateValue={isValidCompany}
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
        Upload addon
      </Button>
    </Stack>
  )
}