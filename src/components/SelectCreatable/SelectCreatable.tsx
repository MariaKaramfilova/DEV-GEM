import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { Option, useSelectData } from "./selectCreatableHelpers.js";
import { getAllIDEs, getIDEsForAddon } from "../../services/IDE.services.js";
import { getAllTags, getTagsForAddon } from "../../services/tag.services.js";
import { TAGS } from "../../common/common.js";

interface Props {
  changeValues: (values: string[]) => void;
  targetId?: string | undefined;
  getAllValues: typeof getAllIDEs | typeof getAllTags;
  getValuesForAddon: typeof getTagsForAddon | typeof getIDEsForAddon;
  type: string;
}

export default function SelectCreatable({ changeValues, targetId, getAllValues, getValuesForAddon, type }: Props) {
  const animatedComponents = makeAnimated();
  const [inputValue, setInputValue] = useState<string>("");

  const { loading, allValues, defaultValues } = useSelectData(targetId, changeValues, getAllValues, getValuesForAddon);

  if (loading) {
    return null;
  }

  return (
    <CreatableSelect
      defaultValue={defaultValues}
      inputValue={inputValue}
      onChange={(newValue: Array<Option> | Option | unknown) => {
        if (Array.isArray(newValue)) {
          const simpleValues = newValue.map((option) => option.value);
          changeValues([...simpleValues, ...defaultValues]);
        } else if (newValue && type !== TAGS) {
          changeValues([newValue.value, ...defaultValues]);
        }
      }}
      onInputChange={(newValue) => setInputValue(newValue.toLowerCase())}
      isClearable
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti={type === TAGS}
      options={allValues}
    />
  );
}
