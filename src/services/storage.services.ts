import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.ts";
import { octokit } from "../config/github.octokit.ts";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 *
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
 */
export const setFileToFirebaseStorage = async (file: File): Promise<string> => {
  const imageRef = ref(storage, `images/${file.name}`);

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  return url;
};

/**
 * Uploads a file to GitHub Storage and returns the download URL.
 *
 * @param {Blob} file - The file to upload.
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
 */
export const setFileToGitHubStorage = async (file: Blob): Promise<string | undefined> => {
  try {
    const fileRef = await octokit.request('POST /repos/MariaKaramfilova/Addonis/git/blobs', {
      owner: 'MariaKaramfilova',
      repo: 'Addonis',
      content: JSON.stringify(file),
      encoding: 'utf-8',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    console.log(fileRef);
    
    return fileRef.url;
  } catch (error) {
    console.log(error);
  }

};
