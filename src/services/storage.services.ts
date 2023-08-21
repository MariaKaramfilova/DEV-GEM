import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.ts";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 *
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
 */
export const setFileToStorage = async (file: File): Promise<string> => {
  const imageRef = ref(storage, `images/${file.name}`);

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  return url;
};
