import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.ts";
import { octokit } from "../config/github.octokit.ts";
import { GITHUB_REPO_NAME, GITHUB_OWNER_NAME } from "../common/common.ts";

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
 * @param {Blob} files - The file to upload.
 * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
 */
export const setFileToGitHubStorage = async (files: Blob[], path: string): Promise<string[] | undefined | string> => {
  
  const responseArr: string[] = [];
  try {
    await Promise.all(files.map(async (file) => {
      const cleanFileName = file.name.replace(/ /g, '');
      
      const base64String = await convertFileToBase64String(file);
      const fileRef = await octokit.request(`PUT /repos/${GITHUB_OWNER_NAME}/${GITHUB_REPO_NAME}/contents/${path}/${cleanFileName}`, {
        owner: GITHUB_OWNER_NAME,
        repo: GITHUB_REPO_NAME,
        content: base64String,
        path: `${path}/${cleanFileName}`,
        message: 'Upload new file',
      })
      responseArr.push(fileRef.data.content.download_url);
    }))

    return responseArr.length === 1 ? responseArr[0] : responseArr;
  } catch (error) {
    console.log(error);
  }
};

export const getRepositoryContentsGitHub = async (path: string) => {
    try {
      const response = await octokit.request(`GET /repos/${GITHUB_OWNER_NAME}/${GITHUB_REPO_NAME}/contents/${path}`, {
        owner: GITHUB_OWNER_NAME,
        repo: GITHUB_REPO_NAME,
        path: path,
      })
      return response;
    } catch (error) {
      console.log(error);
    }

}


