import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext.ts'
import UploadInput from '../UploadInput/UploadInput.tsx';
import TextInputField from '../TextInputField/TextInputField.tsx';
import SelectCreatable from '../SelectCreatable/SelectCreatable.tsx';
import { FormControl, FormLabel } from '@mui/joy';
import { getAllTags, getTagsForAddon } from '../../services/tag.services.ts';
import { getAllIDEs, getIDEsForAddon } from '../../services/IDE.services.ts';
import { IDEs, TAGS } from '../../common/common.ts';

export default function CreateAddon() {
  const { loggedInUser } = useContext(AuthContext);
  const [addonFile, setAddonFile] = useState<Blob | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [originLink, setOriginLink] = useState<string>('');
  const [targetIDE, setTargetIDE] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [IDE, setIDE] = useState<string[]>([]);
  
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
        <SelectCreatable
          changeValues={handleTagsChange}
          getAllValues={getAllTags}
          getValuesForAddon={getTagsForAddon}
          type={TAGS} />
      </FormControl>
      <FormControl>
        <FormLabel>Target IDE</FormLabel>
        <SelectCreatable
          changeValues={handleIDEChange}
          getAllValues={getAllIDEs}
          getValuesForAddon={getIDEsForAddon}
          type={IDEs} />
      </FormControl>
    </>
  )
}