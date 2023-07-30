import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';

export function constructMessage(laneId, message, user) {
  return {
    messageId: generateUniqueID(),
    laneId: laneId,
    content: {
      caption: message,
      urls: [],
    },
    user: {
      userId: user.id,
      username: user.username,
      profilePicUrl: user.profilePicUrl,
    },
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  };
}
