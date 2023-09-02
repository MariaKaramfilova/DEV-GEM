import React, { Dispatch, SetStateAction, useState } from 'react'
import { Addon } from '../../context/AddonsContext.ts'
import CustomSelect from '../CustomSelect/CustomSelect.tsx'
import { Button, Option, Select, Stack } from '@mui/joy';
import { addAddonContributor } from '../../services/addon.services.ts';

type Props = {
  setView: Dispatch<SetStateAction<string>>;
  addon: Addon;
};

function AddContributors({addon, setView}: Props) {
  const [selectedRole, setSelectedRole] = useState("Maintainer");
  const [selectedUser, setSelectedUser] = useState<string[]>("");
  console.log(selectedUser);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event?.target.innerText);
    if (event?.target.innerText === "Owner") {
      setSelectedUser(prev => [prev[0]]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      return;
    }
    try {
      await addAddonContributor(selectedUser, addon.addonId, selectedRole);
    } catch (error) {
      
    } finally {
      setView("manage")
    }
  }


  return (
    <div>
      <div>You're inviting contributors to the {addon.name} add-on.</div>
      <Stack spacing={2} margin="1em">
        <CustomSelect onChange={setSelectedUser} isMulti={selectedRole === "Maintainer"} />
        <Select defaultValue="Maintainer" onChange={handleRoleChange}>
          <Option value="Maintainer">Maintainer</Option>
          <Option value="Owner">Owner</Option>
        </Select>
        <Button onClick={handleSubmit}>Add users</Button>
      </Stack>
    </div>
  )
}

export default AddContributors