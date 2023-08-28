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
  query,
} from "firebase/database";
import { fromPostsDocument } from "./addon.services.js";


export const addReview = async (
    content = null,
    author: string,
    addonId: string,
    userUid: string,
    rating: number,
  ) => {
    return push(ref(database, "reviews"), {
      author,
      content,
      createdOn: Date.now(),
      addonId,
      userUid,
      rating
    }).then((result) => {
      const updateCommentIDequalToHandle = {};
      updateCommentIDequalToHandle[`/reviews/${result.key}/reviewId`] =
        result.key;
      updateCommentIDequalToHandle[
        `/addons/${addonId}/hasReview/${result.key}`
      ] = true;
  
      update(ref(database), updateCommentIDequalToHandle);
  
    //   return getCommentsByPostHandle(result.key);
    });
  };


  /**
 * Fetches reviews associated with a specific post.
 *
 * @param {string} postId - The ID of the post for which to fetch comments.
 * @returns {Promise<Array>} - A promise that resolves with an array of comments for the post.
 */
export const getReviewsByAddontHandle = async (addonId) => {
  return get(
    query(ref(database, "reviews"), orderByChild("addonId"), equalTo(addonId))
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];

    return fromPostsDocument(snapshot);
  });
};


export const getRatingsForAddon = async (addonId: string) => {

  const querySnapshot = await getReviewsByAddontHandle(addonId);
  
  let totalRating = 0;
  let ratingsCount = 0;

  
    querySnapshot.forEach((snapshot) => {
      totalRating += snapshot.rating;
      ratingsCount++;
    });
  

  if (ratingsCount === 0) {
    return 0; 
  }

  const averageRating = totalRating / ratingsCount;
  console.log(averageRating);
  
  return averageRating;
};