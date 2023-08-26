import { blockUser, unblockUser } from "../../services/user.services";
export const handleBlockUser = (userName) => {
    blockUser(userName)
  };

export const handleUnBlockUser = (userName) => {
    unblockUser(userName)
  };