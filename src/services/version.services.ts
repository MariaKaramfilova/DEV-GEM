import { get, push, ref, update } from "firebase/database";
import { database } from "../config/firebase.ts";

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

