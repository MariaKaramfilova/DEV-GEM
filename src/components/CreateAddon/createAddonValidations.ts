import _ from 'lodash';
import { DUPLICATE_FILE, DUPLICATE_NAME, DUPLICATE_VERSION, INVALID_COMPANY, INVALID_DESCRIPTION, INVALID_FILE, INVALID_IDE, INVALID_NAME, INVALID_ORIGIN_LINK, INVALID_TAG, INVALID_VERSION, INVALID_VERSION_INFO } from '../../common/common.ts';
import { getAllAddons } from '../../services/addon.services.ts';
import { getRepositoryContentsGitHub } from '../../services/storage.services.ts';
import { Addon } from '../../context/AddonsContext.ts';
import { getVersionById } from '../../services/version.services.ts';

export async function isValidName(name: string, allAddons: Addon[]): Promise<string | null> {
  if (name.length < 3 || name.length > 30) {
    return INVALID_NAME;
  }

  const isUnique = allAddons ? allAddons.every(addon => !(addon.name === name)) : true;

  if (!isUnique) {
    return DUPLICATE_NAME;
  }

  return null;
}

export function isValidTag(tags: string[]): string | null {
  return _.isEmpty(tags) ? INVALID_TAG : null
}

export function isValidIDE(IDE: string[]): string | null {
  return _.isEmpty(IDE) ? INVALID_IDE : null;
}

export function isValidDescription(description: string): string | null {
  return _.isEmpty(description) || description.length < 10 || description.length > 3000 ? INVALID_DESCRIPTION : null;
}

export function isValidCompany(description: string): string | null {
  return description.length > 50 ? INVALID_COMPANY : null;
}

export const isValidOriginLink = (urlString: string): string | null => {
  try {
    Boolean(new URL(urlString));
    return null;
  }
  catch (e) {
    return INVALID_ORIGIN_LINK;
  }
}

export async function isValidFile(file: null | string, inputLabel: string): Promise<string | null> {

  if (_.isEmpty(file) && inputLabel === 'Plugin file') {
    return INVALID_FILE;
  }

  if (inputLabel === 'Plugin file') {
    try {
      const allAddons = await getAllAddons();

      const isUnique = allAddons ? allAddons.every(addon => !addon.downloadLink.includes(file.replace(/ /g, ''))) : true;
      if (!isUnique) {
        return DUPLICATE_FILE;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if ((inputLabel === 'Logo' || inputLabel === 'Image') && !_.isEmpty(file)) {
    try {
      const allFiles = await getRepositoryContentsGitHub(`${inputLabel}s`);
      const isUnique = allFiles ? allFiles.data.every(el => el.name !== file.replace(/ /g, '')) : true;
      if (!isUnique) {
        return DUPLICATE_FILE;
      }

    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export const isValidVersion = async (version: string, _: Addon[], addon?: Addon): Promise<string | null> => {
  const regex = new RegExp(/^\d+(\.\d+)*$/);

  if (addon) {
    try {
      const matcherArr = await Promise.all(addon?.versions.map(async (id) => {
        const v = await getVersionById(id);
        return v.name === version;
      }));
  
      if (matcherArr?.includes(true)) {
        return DUPLICATE_VERSION;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return !regex.test(version) ? INVALID_VERSION : null;
}

export function isValidVersionInfo(versionInfo: string): string | null {
  return _.isEmpty(versionInfo) || versionInfo.length < 5 || versionInfo.length > 40 ? INVALID_VERSION_INFO : null;
}