import { useEffect, useState } from 'react';
import { getAllTags, getTagsForAddon } from '../../services/tag.services.ts';
import { getAllIDEs, getIDEsForAddon } from '../../services/IDE.services.ts';
export interface Option {
  label: string;
  value: string;
}
export interface Tag {
  tagId: string;
  name: string;
  createdOn: Date;
}

export interface IDE {
  IDEId: string;
  name: string;
  createdOn: Date;
}

export function useSelectData(
  targetId: string | undefined, 
  changeValues: (values: string[]) => void,
  getAllValues: typeof getAllIDEs | typeof getAllTags,
  getValuesForAddon: typeof getTagsForAddon | typeof getIDEsForAddon) {
  const [loading, setLoading] = useState<boolean>(false);
  const [allValues, setAllValues] = useState<Option[]>([]);
  const [defaultValues, setDefaultValues] = useState<Option[]>([]);

  const createOption = (label: string): Option => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const data = targetId ? await getValuesForAddon(targetId) : [];
        const defaultValuesList = data.map((el) =>
          createOption(el[0])
        );
        setDefaultValues(defaultValuesList);
        const simpleValues = data.map((el) => el);
        changeValues(simpleValues);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();

    (async function () {
      try {
        const data = await getAllValues();
        const arr: Option[] = data.map((el: Tag | IDE) => ({
          value: el.name,
          label: el.name,
        }));
        setAllValues(arr);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    allValues,
    defaultValues
  }
}