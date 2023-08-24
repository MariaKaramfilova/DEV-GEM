import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext.ts'
import UploadInput from '../UploadInput/UploadInput.tsx';
import TextInputField from '../TextInputField/TextInputField.tsx';
import SelectCreatable from '../SelectCreatable/SelectCreatable.tsx';
import { Button, FormControl, FormLabel, Stack } from '@mui/joy';
import { getAllTags, getTagsForAddon, updateTags } from '../../services/tag.services.ts';
import { getAllIDEs, getIDEsForAddon, updateIDEs } from '../../services/IDE.services.ts';
import { IDEs, SUCCESS_UPLOAD_PATH, TAGS } from '../../common/common.ts';
import { isValidCompany, isValidDescription, isValidFile, isValidIDE, isValidName, isValidOriginLink, isValidTag } from './createAddonValidations.ts';
import { createAddon, updateAddonTags } from '../../services/addon.services.ts';
import Error from '../../views/Error/Error.tsx';
import Loading from '../../views/Loading/Loading.tsx';
import { useNavigate } from 'react-router-dom';

const errorMap: Map<string, null | string> = new Map([
  ["Name", "blank"],
  ["Source code URL", "blank"],
  ["Description", "blank"],
  ["Company", "blank"],
  ["Source code URL", "blank"],
  ["tags", "blank"],
  ["IDEs", "blank"],
  ["upload", "blank"],
]);

export default function CreateAddon() {
  const { loggedInUser } = useContext(AuthContext);
  const [addonFile, setAddonFile] = useState<Blob | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [originLink, setOriginLink] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [IDE, setIDE] = useState<string[]>([]);
  const [company, setCompany] = useState<string>('');
  const [submitError, setSubmitError] = useState<Map<string, null | string>>(errorMap);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitted(true);
    console.log(Array.from(submitError.values()));
    if (!Array.from(submitError.values()).every(el => el === null)) {
      
      return;
    }
    try {
      if (addonFile) {
        console.log(addonFile);
        setLoading(true);
        const addon = await createAddon(name, description, IDE[0], addonFile, 'loggedInUser.uid', originLink, company);
        navigate(SUCCESS_UPLOAD_PATH);

        await updateAddonTags(addon.addonId, tags);
        await updateTags(tags);
        await updateIDEs(IDE);
      }
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (uploadError) {
    return <Error error={uploadError} />
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
        validateValue={isValidName} />
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