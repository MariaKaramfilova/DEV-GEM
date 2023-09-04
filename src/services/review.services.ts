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
    userEmail: string,
    rating: number,
  ) => {
    return push(ref(database, "reviews"), {
      author,
      content,
      createdOn: Date.now(),
      addonId,
      userUid,
      userEmail,
      rating
    }).then((result) => {
      const updateCommentIDequalToHandle = {};
      updateCommentIDequalToHandle[`/reviews/${result.key}/reviewId`] =
        result.key;
      updateCommentIDequalToHandle[
        `/addons/${addonId}/hasReview/${result.key}`
      ] = true;
  
      update(ref(database), updateCommentIDequalToHandle);
  
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
  
  try{
    await update(reviewRef, {
      content: newContent,
      rating: newRating
    });
  }catch(error){
    console.log(error);
  }finally{
    console.log('review updated');
    
  }
  
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


export const addReviewReply = async (
  content = null,
  author: string,
  reviewId: string,
  addonId: string,

) => {
  return push(ref(database, "replies"), {
    content,
    author,
    createdOn: Date.now(),
    reviewId,
    addonId,

  }).then((result) => {
    const updateReplyIDequalToHandle = {};
    updateReplyIDequalToHandle[`/replies/${result.key}/replyId`] =
      result.key;
      updateReplyIDequalToHandle[
      `/reviews/${reviewId}/hasReply/${result.key}`
    ] = true;

    update(ref(database), updateReplyIDequalToHandle);

    console.log('Reply Uploaded');
    
  });
};

export const getRepliesByReviewUidHandle = async (reviewId: string) => {
  return get(
    query(ref(database, "replies"), orderByChild("reviewId"), equalTo(reviewId))
  ).then((snapshot) => {
    if (!snapshot.exists()) return [];

    console.log('fetched reviews');
    
    return fromAddonsDocument(snapshot);
  });
};

/**
 * Deletes a review reply.
 *
 * @param {string} replyId - The ID of the reply to delete.
 * @param {string} reviewId - The ID of the review associated with the reply.
 * @returns {Promise<void>}
 */
export const deleteReviewReply = async (replyId: string, reviewId: string) => {
  try {
    const shouldDelete = window.confirm("Are you sure you want to delete this review reply?");

    if (shouldDelete) {
      // Delete the reply
      await remove(ref(database, `replies/${replyId}`));

      // Remove the reference to the reply from the review
      await remove(ref(database, `reviews/${reviewId}/hasReply/${replyId}`));
      console.log('Review Reply Deleted');

      alert('Your reply has been deleted')
    }
  } catch (error) {
    console.error('Error deleting review reply:', error);
  }
};
