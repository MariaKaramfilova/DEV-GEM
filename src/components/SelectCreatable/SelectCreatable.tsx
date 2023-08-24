import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { Option, useSelectData } from "./selectCreatableHelpers.js";
import { getAllIDEs, getIDEsForAddon } from "../../services/IDE.services.js";
import { getAllTags, getTagsForAddon } from "../../services/tag.services.js";
import { TAGS } from "../../common/common.js";
import { FormControl } from "@mui/joy";
import ErrorHelper from "../../views/ErrorHelper/ErrorHelper.tsx";

interface Props {
  changeValues: (values: string[]) => void;
  targetId?: string | undefined;
  getAllValues: typeof getAllIDEs | typeof getAllTags;
  getValuesForAddon: typeof getTagsForAddon | typeof getIDEsForAddon;
  type: string;
  validateValue: (value: string[]) => string | null;
  isSubmitted: boolean;
  setSubmitError: Dispatch<SetStateAction<Map<string, null | string> > >;
}

export default function SelectCreatable({
  changeValues,
  targetId,
  getAllValues,
  getValuesForAddon,
  type,
  validateValue,
  isSubmitted,
  setSubmitError
}: Props) {
  const animatedComponents = makeAnimated();
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { loading, allValues, defaultValues } = useSelectData(targetId, changeValues, getAllValues, getValuesForAddon);
  const [currentValue, setCurrentValue] = useState<string[]>([]);

  useEffect(() => {
      const data = validateValue(currentValue);
      setError(data);
      setSubmitError((prev) => prev.set(type, data));
  });

  if (loading) {
    return null;
  }

  return (
    <FormControl>
      <CreatableSelect
        defaultValue={defaultValues}
        inputValue={inputValue}
        onChange={(newValue: Array<Option> | Option | unknown) => {
          setSubmitError((prev) => prev.set(type, null));
          setError(null);
          if (Array.isArray(newValue)) {
            const simpleValues = newValue.map((option) => option.value);
            changeValues([...simpleValues, ...defaultValues]);
            setCurrentValue([...simpleValues, ...defaultValues]);
          } else if (newValue && type !== TAGS) {
            changeValues([newValue.value, ...defaultValues]);
            setCurrentValue([newValue.value, ...defaultValues]);
          }
        }}
        onInputChange={(newValue) => setInputValue(newValue.toLowerCase())}
        isClearable
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti={type === TAGS}
        options={allValues}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary75: 'hotpink',
            primary50: 'black',
          },
        })}
        styles={{
          control: (provided) => ({
            ...provided,
            height: '3em',
            borderColor: error && isSubmitted ? 'var(--joy-palette-danger-outlinedBorder, var(--joy-palette-danger-300, #F09898))' : provided.borderColor,
          }),
        }}
      />
      {error && isSubmitted &&
        <ErrorHelper error={error} />}
    </FormControl>
  );
}
