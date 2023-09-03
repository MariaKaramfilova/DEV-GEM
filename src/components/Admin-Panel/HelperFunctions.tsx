import { blockUser, unblockUser } from "../../services/user.services";
export const handleBlockUser = (userName: string) => {
    blockUser(userName)
  };

export const handleUnBlockUser = (userName: string) => {
    unblockUser(userName)
  };