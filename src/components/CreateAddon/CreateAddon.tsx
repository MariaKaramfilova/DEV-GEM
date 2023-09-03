import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext.ts'
import UploadInput from '../UploadInput/UploadInput.tsx';
import TextInputField from '../TextInputField/TextInputField.tsx';
import SelectCreatable from '../SelectCreatable/SelectCreatable.tsx';
import { Box, Button, FormControl, FormLabel, Stack } from '@mui/joy';
import { getAllTags, getTagsForAddon, updateTags } from '../../services/tag.services.ts';
import { getAllIDEs, getIDEsForAddon, updateIDEs } from '../../services/IDE.services.ts';
import { IDEs, SUCCESS_UPLOAD_PATH, TAGS } from '../../common/common.ts';
import { isValidCompany, isValidDescription, isValidFile, isValidIDE, isValidName, isValidOriginLink, isValidTag, isValidVersion, isValidVersionInfo } from './createAddonValidations.ts';
import { createAddon, getAllAddons, updateAddonTags } from '../../services/addon.services.ts';
import Error from '../../views/Error/Error.tsx';
import Loading from '../../views/Loading/Loading.tsx';
import { useNavigate } from 'react-router-dom';
import DropzoneComponent from '../Dropzone/Dropzone.tsx';
import Typography from '@mui/material/Typography';
import { RequestError } from 'octokit';
import { AddonsContext } from '../../context/AddonsContext.ts';

export const errorMap: Map<string, null | string> = new Map([
  ["Name", "blank"],
  ["Source code URL", "blank"],
  ["Description", "blank"],
  ["Company", "blank"],
  ["tags", "blank"],
  ["IDEs", "blank"],
  ["upload", "blank"],
  ["Version", "blank"],
  ["Version info", "blank"],
  ["logo", null]
]);

export default function CreateAddon() {
  const { loggedInUser } = useContext(AuthContext);
  const { setAllAddons } = useContext(AddonsContext);
  const [addonFile, setAddonFile] = useState<File | undefined>(undefined);
  const [images, setImages] = useState<File[]>([]);
  const [logo, setLogo] = useState<File | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [originLink, setOriginLink] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [IDE, setIDE] = useState<string[]>([]);
  const [company, setCompany] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [versionInfo, setVersionInfo] = useState<string>('');
  const [submitError, setSubmitError] = useState<Map<string, null | string>>(errorMap);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {

    if (!loggedInUser.uid) {
      return;
    }

    setIsSubmitted(true);
    if (!Array.from(submitError.values()).every(el => el === null)) {
      return;
    }
    try {
      if (addonFile) {
        setLoading(true);
        const addon = await createAddon(
          name,
          description,
          IDE[0],
          [addonFile],
          images,
          loggedInUser.uid,
          originLink,
          company,
          [logo],
          version,
          versionInfo);
        navigate(SUCCESS_UPLOAD_PATH);
        await updateAddonTags(addon.addonId, tags);
        await updateTags(tags);
        await updateIDEs(IDE);
        const result = await getAllAddons();
        setAllAddons((prev) => ({ ...prev, allAddons: result }));
      }
    } catch (error) {
      if (error instanceof RequestError) {
        setUploadError(error.message);
      }
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
    <Stack spacing={4}
      sx={{
        maxWidth: '60%',
        borderRadius: 'sm',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '3em'
      }}>
        <Typography variant='h4' sx={{pt:3}}>Upload addon for IDEs</Typography>

      <UploadInput
        setValue={setAddonFile}
        setSubmitError={setSubmitError}
        isSubmitted={isSubmitted}
        validateValue={isValidFile}
        isRequired={true}
        acceptedFormats='.jar, .zip'
        inputLabel='Plugin file' />

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flexGrow: 1 }}>

          <FormControl>
            <TextInputField setValue={setVersion}
              inputType="text"
              inputPlaceholder="Enter version #"
              inputLabel="Version"
              setSubmitError={setSubmitError}
              isSubmitted={isSubmitted}
              validateValue={isValidVersion}
              initialValue={version} />
          </FormControl>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <FormControl>
            <TextInputField setValue={setVersionInfo}
              inputType="text"
              inputPlaceholder="Enter version info"
              inputLabel="Version info"
              setSubmitError={setSubmitError}
              isSubmitted={isSubmitted}
              validateValue={isValidVersionInfo}
              initialValue={versionInfo}
              isRequired={false} />
          </FormControl>
        </Box>

      </Box>

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

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flexGrow: 1 }}>

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
        </Box>

        <Box sx={{ flexGrow: 1 }}>
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
        </Box>

      </Box>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <UploadInput
            setValue={setLogo}
            setSubmitError={setSubmitError}
            isSubmitted={isSubmitted}
            validateValue={isValidFile}
            isRequired={false}
            acceptedFormats='.jpg, .png, .svg'
            inputLabel='Logo' />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextInputField setValue={setCompany}
            inputType="text"
            inputPlaceholder="Enter name"
            inputLabel="Company"
            isSubmitted={isSubmitted}
            validateValue={isValidCompany}
            setSubmitError={setSubmitError} />
        </Box>
      </Box>

      <FormControl sx={{ alignItems: 'center' }}>
        <DropzoneComponent
          setFiles={setImages}
          validateValue={isValidFile} />
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