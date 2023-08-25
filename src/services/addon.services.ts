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
  };