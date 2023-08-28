import { database } from "../config/firebase.js";
import {
  get,
  ref,
  query,
  orderByChild,
  equalTo,
  push,
  update,
  remove,
  set,
  DataSnapshot,
} from "firebase/database";
import { deleteFileGitHub, getRepositoryContentsGitHub, setFileToGitHubStorage } from "./storage.services.js";
import { getCommentsByPostHandle } from "./comment.services.js";
import { Addon } from "../context/AddonsContext.js";
import _ from "lodash";
import { getTagsForAddon } from "./tag.services.js";


/**
 * Transforms the addon document snapshot into an array of addon objects.
 *
 * @param {DataSnapshot} snapshot - The snapshot of the addons document.
 * @returns {Array} - An array of addon objects.
 */
export const fromAddonsDocument = (snapshot: DataSnapshot): Addon[] => {
  const addonsDocument = snapshot.val();

  return Object.keys(addonsDocument).map((key) => {
    const addon = addonsDocument[key];

    return {
      ...addon,
      id: key,
      uploadDate: new Date(addon.createdOn),
      ratings: addon.ratings ? Object.keys(addon.ratings) : [],
      tags: addon.tags ? Object.keys(addon.tags) : [],
      maintainers: addon.maintainers ? Object.keys(addon.maintainers) : [],
      images: addon.images ? Object.keys(addon.images) : [],
    };
  });
};

/**
 * Creates a new addon.
 *
 * @param {string} name - The title of the addon.
 * @param {string} description - The content of the addon.
 * @param {string} targetIDE - The topic of the addon.
 * @param {Blob} file - The file associated with the addon.
 * @param {Blob} logo - The logo file.
 * @param {string} userUid - The author's handle.
 * @param {string} originLink - The author's handle.
 * @param {Array} tags - The author's email.
 * @param {string} company - The author's user ID.
 * @returns {Promise<Object>} - A promise that resolves with the created addon object.
 */
export const createAddon = async (
  name: string,
  description: string,
  targetIDE: string,
  file: File[],
  images: File[],
  userUid: string,
  originLink: string,
  company: string | null,
  logo: (File | undefined)[]
): Promise<Addon> => {
  const result = await push(ref(database, "addons"), {
    name,
    targetIDE,
    description,
    originLink,
    downloadLink: await setFileToGitHubStorage(file, 'Addons'),
    logo: !logo[0] ? null : await setFileToGitHubStorage(logo, 'Logos'),
    userUid,
    createdOn: Date.now(),
    addonId: "null",
    company,
    status: 'pending',
    ownerUid: userUid,
    images: _.isEmpty(images) ? null: await setFileToGitHubStorage(images, 'Images'),
    downloads: 0
  });

  if (result.key !== null) {
    const updateAddonIDequalToHandle: { [key: string]: string | null } = {};
    updateAddonIDequalToHandle[`/addons/${result.key}/addonId`] = result.key;
    await update(ref(database), updateAddonIDequalToHandle);

    return getAddonById(result.key);
  } else {
    throw new Error("Addon key is null");
  }
};

export const editAddon = async (
  currentAddonState: Addon,
  name: string,
  description: string,
  targetIDE: string,
  file: File[],
  images: File[],
  originLink: string,
  company: string | null,
  logo: (File | undefined)[]
): Promise<Addon> => {
  const updates: Addon = {};

  if (currentAddonState.name !== name) {
    updates.name = name;
  }

  if (currentAddonState.description !== description) {
    updates.description = description;
  }

  if (currentAddonState.targetIDE !== targetIDE) {
    updates.targetIDE = targetIDE;
  }

  if (currentAddonState.originLink !== originLink) {
    updates.originLink = originLink;
  }

  if (currentAddonState.company !== company) {
    updates.company = company;
  }

  if (!currentAddonState.downloadLink.includes(file[0].name)) {
    try {
      updates.downloadLink = await setFileToGitHubStorage(file, 'Addons');
    } catch (error) {
      console.log(error);
    }
  }

  if (!(currentAddonState.logo ? currentAddonState.logo : '').includes(logo[0].name)) {
    try {
      updates.logo = await setFileToGitHubStorage(logo, 'Logos');
    } catch (error) {
      console.log(error);
    }
  }

  const newImages = images
    .filter(image => !currentAddonState.images?.some(el => el.includes(image.name)));
  const oldImages = currentAddonState.images?.filter(el => images.some(image => image.name.includes(el.substring(el.lastIndexOf('/') + 1, el.length)))) || [];
  const imagesToDelete = currentAddonState.images?.filter(el => images.every(image => !image.name.includes(el.substring(el.lastIndexOf('/') + 1, el.length)))) || [];

  if (newImages.length !== 0 || oldImages?.length !== currentAddonState.images?.length) {
    try {
      const readyToAddURLs = newImages.length ? await setFileToGitHubStorage(newImages, 'Images') : [];
      updates.images = _.concat([], readyToAddURLs, oldImages);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    await update(ref(database, `addons/${currentAddonState.addonId}`), updates);
    console.log("addon updated successfully!");

    if (imagesToDelete) {
      const allFiles = (await getRepositoryContentsGitHub('Images'))?.data.filter(el => imagesToDelete?.includes(el.download_url));
      console.log(allFiles);
      console.log(allFiles.map(el => ({sha: el.sha, name: el.name})));
      
      await deleteFileGitHub('Images', allFiles.map(el => ({sha: el.sha, name: el.name})));
    }

    return getAddonById(currentAddonState.addonId);
  } catch (error) {
    console.error("Error updating addon:", error);
    throw error;
  }
};

/**
 * Deletes a addon and its associated comments.
 *
 * @param {string} addonId - The ID of the addon to delete.
 * @returns {Promise<void>} - A promise that resolves when the addon and comments are deleted.
 */
// export async function deleteaddon(addonId: string): Promise<void> {
//   await remove(ref(database, `addons/${addonId}`));

//   const comments = await getCommentsByaddonHandle(addonId);
//   const commentIds = Object.keys(comments);
//   const removeCommentsPromises = commentIds.map((commentId) =>
//     remove(ref(database, `comments/${commentId}`))
//   );

//   await Promise.all(removeCommentsPromises);

//   console.log("addon and associated comments deleted successfully");
// }

/**
 * Fetches all addons from the database.
 *
 * @returns {Promise<Addon[]>} - A promise that resolves with an array of all addons.
 */

export const getAllAddons = async (): Promise<Addon[]> => {
  try {
    const snapshot = await get(ref(database, "addons")); // Assumes "addons" is the path to your addons data

    if (!snapshot.exists()) {
      return [];
    }

    const addonsData = snapshot.val();
    const addonsArray = Object.values(addonsData);
    return addonsArray;
  } catch (error) {
    console.error("Error fetching addons:", error);
    return [];
  }
};

/**
 * Fetches addons created by a specific user handle.
 *
 * @param {string} handle - The handle of the user.
 * @returns {Promise<Array>} - A promise that resolves with an array of addons created by the user.
 */
export const getAddonsByUser = async (handle: string): Promise<Addon[]> => {
  const snapshot = await get(
    query(ref(database, "addons"), orderByChild("author"), equalTo(handle))
  );
  if (!snapshot.exists()) return [];

  return fromAddonsDocument(snapshot);
};

/**
 * Update tags of an addon.
 *
 * @param {string} addonId - The ID of the addon to which tags will be added.
 * @param {Array<string>} tags - An array of tags to add to the addon.
 * @returns {Promise<void>} - A promise that resolves when the tags are successfully added to the addon.
 */
export const updateAddonTags = async (addonId: string, tags: string[]): Promise<void> => {
  const updateAddonTags: { [key: string]: string | boolean | null } = {};
  tags.map((tag) => {

    updateAddonTags[`/addons/${addonId}/tags/${tag}`] = true;
  });
  try {
    const currentTags = await getTagsForAddon(addonId);

    currentTags.map(tag => {
      if (!tags.includes(tag)) {
        updateAddonTags[`/addons/${addonId}/tags/${tag}`] = null;
      }
    })

  } catch (error) {
    console.log(error);

  }

  return update(ref(database), updateAddonTags);
};

export const updateAddonStatus = (addonId: string, newStatus: string) => {
  const updateStatus = {};
  updateStatus[`/addons/${addonId}/status/`] = newStatus;

  return update(ref(database), updateStatus);
};

/**
 * Increments the download count of an addon.
 *
 * @param {string} addonId - The ID of the addon to increment the download count for.
 * @returns {Promise<void>}
 */
export const incrementDownloadCount = async (addonId: string): Promise<void> => {
  // Get a reference to the addon's downloads property
  const downloadsRef = ref(database, `addons/${addonId}/downloads`);

  // Get the current download count
  const currentCountSnapshot = await get(downloadsRef);
  const currentCount = currentCountSnapshot.val();

  // Increment the download count by 1
  await set(downloadsRef, currentCount + 1);
}

