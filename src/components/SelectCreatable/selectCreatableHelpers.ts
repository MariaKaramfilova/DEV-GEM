import { useEffect, useState, useContext } from 'react';
import { getAllTags, getTagsForAddon } from '../../services/tag.services.ts';
import { getAllIDEs, getIDEsForAddon } from '../../services/IDE.services.ts';
import { AddonsContext } from '../../context/AddonsContext.ts';
import { TAGS } from '../../common/common.ts';
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
  getValuesForAddon: typeof getTagsForAddon | typeof getIDEsForAddon,
  type: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [allValues, setAllValues] = useState<Option[]>([]);
  const [defaultValues, setDefaultValues] = useState<Option[]>([]);
  const { allAddons } = useContext(AddonsContext);

  const createOption = (label: string): Option => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });
  
  useEffect(() => {
    setLoading(true);

    (async function () {
      try {
        const addon = allAddons.filter(el => el.addonId === targetId)[0];
        let defaultData;
        if (type === TAGS) {
          console.log('here');
          
          defaultData = allAddons && targetId ? Object.keys(addon.tags) : [];
        } else {
          defaultData = allAddons && targetId ? [addon.targetIDE] : [];
        }
        
        const defaultValuesList = defaultData.map((el) =>
          createOption(el)
        );
        setDefaultValues(defaultValuesList);
        const simpleValues = defaultData.map((el) => el);
        changeValues(simpleValues);

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
  }, [targetId]);

  return {
    loading,
    allValues,
    defaultValues
  }
}