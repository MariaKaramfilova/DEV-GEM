import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext.ts'
import UploadInput from '../UploadInput/UploadInput.tsx';
import TextInputField from '../TextInputField/TextInputField.tsx';
import SelectCreatable from '../SelectCreatable/SelectCreatable.tsx';
import { FormControl, FormLabel } from '@mui/joy';

export default function CreateAddon() {
  const { loggedInUser } = useContext(AuthContext);
  const [addonFile, setAddonFile] = useState<Blob | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [originLink, setOriginLink] = useState<string>('');
  const [targetIDE, setTargetIDE] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  /**
   * Handle change event for the SelectCreatable component.
   * @param {Array} e - The selected tags.
   */
  const handleSelectChange = (e: string[]) => {
    setTags(e);
  };

  return (
    <>
      <h3>Upload addons for IDEs</h3>
      <UploadInput />
      <TextInputField setValue={setName}
        inputType="text"
        inputPlaceholder="Enter unique name"
        inputLabel="Name" />
      <TextInputField setValue={setOriginLink}
        inputType="text"
        inputPlaceholder="https://"
        inputLabel="Source code URL" />
      <TextInputField setValue={setDescription}
        inputType="text"
        inputPlaceholder="Add details"
        inputLabel="Description" />
      <FormControl>
        <FormLabel>Tags</FormLabel>
      <SelectCreatable changeTags={handleSelectChange} />
      </FormControl>
    </>
  )
}