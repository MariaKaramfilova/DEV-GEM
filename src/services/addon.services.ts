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
  increment
} from "firebase/database";
import { setFileToStorage } from "./storage.services.js";
import { getCommentsByPostHandle } from "./comment.services.js";


/**
 * Transforms the posts document snapshot into an array of post objects.
 *
 * @param {DataSnapshot} snapshot - The snapshot of the posts document.
 * @returns {Array} - An array of post objects.
 */
export const fromPostsDocument = (snapshot) => {
    const postsDocument = snapshot.val();
  
    return Object.keys(postsDocument).map((key) => {
      const post = postsDocument[key];
  
      return {
        ...post,
        id: key,
        createdOn: new Date(post.createdOn),
        upvotedBy: post.upvotedBy ? Object.keys(post.upvotedBy) : [],
        downvotedBy: post.downvotedBy ? Object.keys(post.downvotedBy) : [],
        hasComment: post.hasComment ? Object.keys(post.hasComment) : [],
      };
    });
  };

/**
 * Fetches a post by its ID.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object>} - A promise that resolves with the fetched post object.
 * @throws {Error} - If the post with the specified ID does not exist.
 */
export const getAddonById = (id: string) => {
    return get(ref(database, `addons/${id}`)).then((result) => {
      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }
  
      const post = result.val();
      post.id = id;
      post.createdOn = new Date(post.createdOn);
      if (!post.upvotedBy) post.upvotedBy = [];
  
      return post;
    });
  };

  /**
 * Fetches posts authored by a specific user handle.
 *
 * @param {string} handle - The handle of the user.
 * @returns {Promise<Array>} - A promise that resolves with an array of posts authored by the user.
 */
export const getAddonsByAuthor = (handle) => {
    return get(
      query(ref(database, "addons"), orderByChild("author"), equalTo(handle))
    ).then((snapshot) => {
      if (!snapshot.exists()) return [];
  

      return fromPostsDocument(snapshot);
    });
  };import { database } from "../config/firebase.js";
import {
  get,
  ref,
  query,
  orderByChild,
  equalTo,
  push,
  update,
  remove,
  DataSnapshot,
} from "firebase/database";
import { setFileToGitHubStorage } from "./storage.services.js";
import { getTagsForAddon } from "./tag.services.js";
import _ from 'lodash';

export interface Addon {
  name: string;
  ratings?: string[];
  targetIDE: string;
  userUid: string;
  description: string;
  tags: string[];
  downloadLink: string;
  originLink: string;
  isFeatured?: boolean;
  downloadsCount?: number;
  uploadDate: Date;
  draftCreateDate?: Date;
  addonId: string;
  status: string;
  ownerUid: string;
  maintainers?: string[];
  company?: string;
  images?: string[];
}
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
  file: Blob[],
  images: Blob[],
  userUid: string,
  originLink: string,
  company: string | null,
  logo: (Blob | undefined)[]
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

/**
 * Edits an existing addon.
 *
 * @param {string} addonId - The ID of the addon to edit.
 * @param {string} title - The new title of the addon.
 * @param {string} topic - The new topic of the addon.
 * @param {string|null} content - The new content of the addon.
 * @param {File|null} file - The new file associated with the addon.
 * @returns {Promise<Object>} - A promise that resolves with the edited addon object.
 */
// export const editaddon = async (
//   addonId: string,
//   title: string,
//   topic: string,
//   content: string | null = null,
//   file: File | null = null
// ): Promise<Addon> => {
//   let updates;

//   if (content) {
//     updates = {
//       title,
//       content,
//       topic,
//     };
//   }

//   if (file) {
//     updates = {
//       title,
//       file: file ? await setFileToStorage(file) : null,
//       topic,
//     };
//   }

//   try {
//     await update(ref(database, `addons/${addonId}`), updates);
//     console.log("addon updated successfully!");
//     return getaddonById(addonId);
//   } catch (error) {
//     console.error("Error updating addon:", error);
//     throw error;
//   }
// };

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
 * @returns {Promise<Array>} - A promise that resolves with an array of all addons.
 */
export const getAllAddons = async (): Promise<Addon[]> => {
  const snapshot = await get(ref(database, "addons"));
  if (!snapshot.exists()) {
    return [];
  }

  return fromAddonsDocument(snapshot);
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

/**
 * Increments the download count of an addon.
 *
 * @param {string} addonId - The ID of the addon to increment the download count for.
 * @returns {Promise<void>}
 */
export const incrementDownloadCount = async (addonId: string): Promise<void> => {

  const downloadsRef = ref(database, `addons/${addonId}/downloads`);
  const currentCountSnapshot = await get(downloadsRef);
  const currentCount = currentCountSnapshot.val();

  await set(downloadsRef, currentCount + 1);
  
}

/**
 * Deletes a post and its associated comments.
 *
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<void>} - A promise that resolves when the post and comments are deleted.
 */
export async function deletePost(addonId: string) {
  await remove(ref(database, `addons/${addonId}`));

  // const reviews = await (postId);
  const commentIds = Object.keys(comments);
  const removeCommentsPromises = commentIds.map((commentId) =>
    remove(ref(database, `comments/${commentId}`))
  );

  await Promise.all(removeCommentsPromises);

  console.log("Post and associated comments deleted successfully");
}
