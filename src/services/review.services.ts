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
import { fromAddonsDocument } from "./addon.services.js";


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

    return fromAddonsDocument(snapshot);
  });
};

export const getReviewsByUserUidHandle = async (userUid: string) => {
  return get(
    query(ref(database, "reviews"), orderByChild("userUid"), equalTo(userUid))
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];

    console.log('fetched reviews');
    
    return fromAddonsDocument(snapshot);
  });
};

/**
 * Returns rating value.
 *
 * @param {string} addonId - The ID of the addon associated with the review.
 * @returns {number} the average rating of the addon
 */
export const getRatingsForAddon = async (addonId: string) => {

  const querySnapshot = await getReviewsByAddontHandle(addonId);

  let totalRating = 0;
  let ratingsCount = 0;
  
  try{
  
    querySnapshot.forEach((snapshot) => {
      totalRating += snapshot.rating;
      ratingsCount++;
    });

  }catch(error){
    console.log(error);
    
  }

  if (ratingsCount === 0) {
    return 0; 
  }

  const averageRating = totalRating / ratingsCount;
  console.log(averageRating);
  return averageRating;
};

/**
 * Deletes a review.
 *
 * @param {string} reviewId - The ID of the review to delete.
 * @param {string} addonId - The ID of the addon associated with the review.
 * @returns {Promise<void>}
 */
export const deleteReview = async (reviewId: string, addonId: string): Promise<void> => {
  const shouldDelete = window.confirm("Are you sure you want to delete this review?");

  if (shouldDelete) {
    const reviewRef = ref(database, `reviews/${reviewId}`);
    
    // Delete the review
    await remove(reviewRef);

    // Update addon's hasReview property
    const updateHasReview = {};
    updateHasReview[`/addons/${addonId}/hasReview/${reviewId}`] = null;
    update(ref(database), updateHasReview);
  }
}


/**
 * Edits a review.
 *
 * @param {string} reviewId - The ID of the review to edit.
 * @param {string} newContent - The new content of the review.
 * @param {number} newRating - The new rating for the review.
 * @returns {Promise<void>}
 */
export const editReview = async (reviewId: string, newContent: string, newRating: number): Promise<void> => {
  const reviewRef = ref(database, `reviews/${reviewId}`);
  
  await update(reviewRef, {
    content: newContent,
    rating: newRating
  });
}

export const deleteReviewsForAddon = async (addonId: string): Promise<void> => {
  try {

    const reviews = await getReviewsByAddontHandle(addonId);

    if (reviews.length === 0) {
      console.log(`No reviews found for addonId ${addonId}`);
      return;
    }

    const deletionPromises = reviews.map(async (review) => {
      await remove(ref(database, `reviews/${review.reviewId}`));
      await update(ref(database), {
        [`/addons/${addonId}/hasReview/${review.reviewId}`]: null
      });
    });

    await Promise.all(deletionPromises);

    console.log(`All reviews for addonId ${addonId} deleted successfully`);
  } catch (error) {
    console.error(error);
  }
};
