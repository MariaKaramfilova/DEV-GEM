import { addUserNotification, blockUser, unblockUser } from "../../services/user.services";
export const handleBlockUser = (userName: string) => {
    blockUser(userName)
    addUserNotification(userName, 'You are blocked for breaking our platform rules!')
  };

export const handleUnBlockUser = (userName: string) => {
    unblockUser(userName)
    addUserNotification(userName, 'You are unblocked and can now take advantage of everything on our platform!')
  };