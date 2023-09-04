import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import Select from 'react-select';
import { Option } from '../SelectCreatable/selectCreatableHelpers.ts';
import { CustomOption } from './CustomOption.tsx';
import { AuthContext, LoggedInUser } from '../../context/AuthContext.ts';
import { Contributors } from '../../context/AddonsContext.ts';

type Props = {
  onChange: Dispatch<SetStateAction<string>>;
  isMulti: boolean;
  currentMaintainers: Contributors;
};

function CustomSelect({ onChange, isMulti, currentMaintainers }: Props) {
  const { allUsers } = useContext(AuthContext);
  const [options, setOptions] = useState<Option[]>(() => convertToOptionsFormat(allUsers));

  console.log(currentMaintainers);
  
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function convertToOptionsFormat(arr: LoggedInUser[]): Option[] {
    return arr.map(el => ({
      value: el.firstName + " " + el.lastName,
      details: el.username,
      image: el.profilePictureURL,
      label: el.username,
      id: el.uid
    }))
  }

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsMenuOpen(value.length > 0);
    setOptions(value.length > 0 ? convertToOptionsFormat(allUsers)
      .filter(el => (el.details?.startsWith(value)
        || el.value.startsWith(value))
        && !Object.values(currentMaintainers).includes(el.id))
      : convertToOptionsFormat(allUsers));
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleSelectChange = (value: Option | Option[] | null) => {
    if (isMulti && Array.isArray(value)) {
      onChange(value.map(option => option.id));
    } else if (!isMulti && value) {
      onChange([value.id]);
    }
  };

  return (
    <Select
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleSelectChange}
      onMenuClose={handleMenuClose}
      options={options}
      menuIsOpen={isMenuOpen}
      components={{ Option: CustomOption }}
      isMulti={isMulti}
    />
  );
}

export default CustomSelect;