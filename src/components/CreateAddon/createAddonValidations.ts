import _ from 'lodash';
import { INVALID_COMPANY, INVALID_DESCRIPTION, INVALID_FILE, INVALID_IDE, INVALID_NAME, INVALID_ORIGIN_LINK, INVALID_TAG } from '../../common/common.ts';

export function isValidNameLength(name: string): string | null {
  return name.length < 3 || name.length > 30 ? INVALID_NAME : null;
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
export function isValidFile(file: null | string): string | null {
  return _.isEmpty(file) ? INVALID_FILE : null;
}