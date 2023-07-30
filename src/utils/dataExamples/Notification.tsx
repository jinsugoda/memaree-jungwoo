const PROFILE_PIC = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-york-skyline-on-a-sunny-day-with-clear-blue-sky-royalty-free-image-1577127184.jpg";

const NAME = "Robert33";

const LIKE_NOTIFICATION = {};
const COMMENT_NOTIFICATION = {};
const POST_NOTIFICATION = {};
const REMIND_NOTIFICATION = {};
const REMEMBERED_NOTIFICATION = {};
const FRIEND_REQUEST_NOTIFICATION = {};
const FRIEND_ACCEPT_NOTIFICATION = {};

function generatePostNotification(action: string) {
  const GENERIC_NOTIFICATION = {
    id: "1",
    name: NAME,
    profilePic: PROFILE_PIC,
    action: action,
    postUrl:"Google.com",
    seen: false,
    postPreview: PROFILE_PIC,
    time: new Date(167780304400),

    handleDeleteNotification: (id: string) => {}
  };

  return GENERIC_NOTIFICATION;
};

function generateUserNotification(action: string) {
  const GENERIC_NOTIFICATION = {
    id: "1",

    name: NAME,
    profilePic: PROFILE_PIC,
    action: action,

    seen: false,
    time: new Date(167780304400),

    handleDeleteNotification: (id: string) => {}
  };
};

function generateMessageNotification(action: string) {
  const GENERIC_NOTIFICATION = {
    id: "1",
    
    name: NAME,
    profilePic: PROFILE_PIC,
    action: action,
    message: "Hello",
    seen: false,
    time: new Date(167780304400),

    handleDeleteNotification: (id: string) => {}
  };
}


// home
export const notificationData = [
    // NewPost...
    generatePostNotification("Posted a new post"),

    // PostInteractions...
    generatePostNotification("Likes your post"),
    generatePostNotification("Likes your caption"),
    generatePostNotification("Commented on your post"),
    generatePostNotification("Remembered your post"),
];

export const moreNotificationData = [
    // UserInteractions...
    generateUserNotification("Remembered you"),
    generateUserNotification("Reminded you"),

    // FriendInteractions...
    generateUserNotification("Sent you a friend request"),
    generateUserNotification("Accepted your friend request"),



    // Messages...
    generateMessageNotification("Sent you a message"),
    generateMessageNotification("System message"),
];


