import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { getAllTags, getTagsForAddon } from "../../services/tag.services.js";

interface Option {
  label: string;
  value: string;
}

interface Props {
  changeTags: (tags: string[] | Option[]) => void;
  addonId?: string | undefined;
}

export interface Tag {
  tagId: string;
  name: string;
  createdOn: Date;
}

export default function SelectCreatable({ changeTags, addonId }: Props) {
  const animatedComponents = makeAnimated();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [value, setValue] = useState<Option[]>([]);
  const [allTags, setAllTags] = useState<Option[]>([]);
  const [defaultTags, setDefaultTags] = useState<Option[]>([]);

  const createOption = (label: string): Option => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const tagsData = addonId ? await getTagsForAddon(addonId) : [];
        const defaultTagsList = tagsData.map((el) =>
          createOption(el[0])
        );
        setDefaultTags(defaultTagsList);
        setValue(defaultTagsList);
        changeTags(defaultTagsList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();

    (async function () {
      try {
        const data = await getAllTags();
        const arr: Option[] = data.map((tag: Tag) => ({
          value: tag.name,
          label: tag.name,
        }));
        setAllTags(arr);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <CreatableSelect
      defaultValue={defaultTags}
      inputValue={inputValue}
      onChange={(newValue) => {
        setValue([...newValue]);
        changeTags([...newValue, ...defaultTags]);
      }}
      onInputChange={(newValue) => setInputValue(newValue.toLowerCase())}
      isClearable
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={allTags}
    />
  );
}
