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

const convertFileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    const fileContent = new FileReader();
    fileContent.onload = () => {
      const base64String = btoa(fileContent.result);
      resolve(base64String);
    };
    fileContent.onerror = (error) => {
      reject(error);
    };
    fileContent.readAsBinaryString(file);
  });
}


/**
 * Uploads a file to GitHub Storage and returns the download URL.
 *
 * @param {Blob} file - The file to upload.
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
 */
export const setFileToGitHubStorage = async (file: Blob): Promise<string | undefined> => {
  
  try {
    const base64String = await convertFileToBase64String(file);
    const fileRef = await octokit.request(`PUT /repos/MariaKaramfilova/Addonis/contents/Addons/${file.name}`, {
      owner: 'MariaKaramfilova',
      repo: 'Addonis',
      content: base64String,
      path: `Addons/${file.name}`,
      message: 'Adding new addon',
    })
    console.log(fileRef);

    return fileRef.data.content.download_url;
  } catch (error) {
    console.log(error);
  }

};
