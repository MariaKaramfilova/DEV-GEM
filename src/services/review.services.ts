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
      commentId: "null",
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