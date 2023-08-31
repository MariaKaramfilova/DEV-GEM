import { database } from "../config/firebase.ts";
import { fromAddonsDocument } from "./addon.services.ts";

import {
  get,
  ref,
  orderByChild,
  equalTo,
  push,
  update,
  remove,
  query,
} from "firebase/database";

export interface Version {
  version: string;
  createdOn: Date;
  downloadLink: string;
  addonId: string;
  info?: string;
  userUid: string;
  versionId: string;
}

export const createVersion = async (
  version: string,
  downloadLink: string,
  addonId: string,
  info: string,
  userUid: string,
): Promise<string> => {
  try {
    const result = await push(ref(database, "versions"), {
      version,
      downloadLink,
      info,
      userUid,
      createdOn: Date.now(),
      addonId,
      versionId: "null"
    });

    if (result.key !== null) {
      const updateVersionIdEqualToHandle: { [key: string]: string | null } = {};
      updateVersionIdEqualToHandle[`/versions/${result.key}/versionId`] = result.key;
      await update(ref(database), updateVersionIdEqualToHandle);

      return result.key;
    } else {
      throw new Error("Version key is null");
    }
  } catch (error) {
    console.log(error);
  }

};

export const getVersionById = (id: string) => {
  return get(ref(database, `versions/${id}`)).then((result) => {
    if (!result.exists()) {
      throw new Error(`Version with id ${id} does not exist!`);
    }

    const version = result.val();
    return version;
  });
};

  /**
* Fetches updates associated with a specific addon.
*
* @param {string} postId - The ID of the post for which to fetch comments.
* @returns {Promise<Array>} - A promise that resolves with an array of comments for the post.
*/
export const getVersionsByAddontHandle = async (addonId: string) => {
  return get(
    query(ref(database, "versions"), orderByChild("addonId"), equalTo(addonId))
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];
 
    return fromAddonsDocument(snapshot);
  });
 };


export const deleteVersionsByAddonHandle = async (addonId: string): Promise<void> => {
  try {
   
    const versions = await getVersionsByAddontHandle(addonId);

    if (versions.length === 0) {
      console.log(`No versions found for addonId ${addonId}`);
      return;
    }

    const deletionPromises = versions.map(async (version) => {
      await remove(ref(database, `versions/${version.versionId}`));
   
    });

    await Promise.all(deletionPromises);

    console.log(`All versions for addonId ${addonId} deleted successfully`);
  } catch (error) {
    console.error(error);
  }
};