import { generateRandomProfilePic } from "./helperFuncs";

const COMMENT_TEXT = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

/*
ACTUAL COMMENT FORMAT:

const newComment = {
    _id: id,
    isLiked: false,
    content: {
        caption: commentText,
        urls: []
    },
    likeCount: 0,
    reactions: [],
    subComments: [],
    user: {
        _id: _id,
        username: user.getUsername(),
        profilePicUrl: getProfilePic()
    },
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
}
*/
export const COMMENT_DATA = [
    {
        _id: "CMT9",
        content: {
            imageUrls: ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
            caption: COMMENT_TEXT,
        },
        reactions: [],
        subComments: [],
        user: {
            _id: "3",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date("2023-03-23T00:00:00.000Z"),
        updatedAt: null,
        deletedAt: null,
    },
    {
        _id: "CMT9",
        content: {
            imageUrls: ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
            caption: COMMENT_TEXT,
        },
        reactions: [],
        subComments: [],
        user: {
            _id: "3",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date("2023-03-23T00:00:00.000Z"),
        updatedAt: null,
        deletedAt: null,
    },
    {
        _id: "CMT10",
        content: {
            imageUrls: ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
            caption: COMMENT_TEXT,
        },
        reactions: [],
        subComments: [],
        user: {
            _id: "3",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date("2023-03-23T00:00:00.000Z"),
        updatedAt: null,
        deletedAt: null,
    },
    {
        _id: "CMT11",
        content: {
            imageUrls: ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
            caption: COMMENT_TEXT,
        },
        reactions: [],
        subComments: [],
        user: {
            _id: "3",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date("2023-03-23T00:00:00.000Z"),
        updatedAt: null,
        deletedAt: null,
    },
    {
        _id: 'CMT1',
        content: {
          imageUrls: ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
          caption: "text",
        },
        reactions: [],
        subComments: [
            {
                _id: 'CMT2',
                content: {
                imageUrls: ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
                caption: COMMENT_TEXT,
                },
                subComments: [],
                reactions: [],
                user: {
                    _id: '0',
                    username: "nameofsubone",
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date("2023-03-23T00:00:00.000Z"),
                updatedAt: null,
                deletedAt: null,
            },
            {
                _id: 'CMT3',
                isLiked: false,
                likeCount: 0,
                content: {
                    imageUrls: ["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
                    caption: COMMENT_TEXT,
                },
                subComments: [],
                reactions: [],
                user: {
                    _id: '1',
                    username: "nameofsubtwp",
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null
            }
        ],
        user: {
            _id: '2',
            username: "nameofone",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date("2023-03-23T00:00:00.000Z"),
        updatedAt: null,
        deletedAt: null,
    },
    {
        _id: 'CMT4',
        content: {
            imageUrls:["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
            caption: COMMENT_TEXT,
        },
        reactions: [],
        subComments: [],
        user: {
            _id: '3',
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
    },
    {
        _id: 'CMT5',
        content: {
            imageUrls:["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
            caption: ".",
        },
        reactions: [],
        subComments: [],
        user: {
            _id: '2',
            username: "@nameoffour",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
    },
    {
    _id: 'CMT6',
    content: {
        imageUrls:["https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"],
        caption: COMMENT_TEXT,
    },
    reactions: [],
    subComments: [],
    user: {
        _id: '1',
        username: "@nameoffive",
        profilePicUrl: generateRandomProfilePic()
    },
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null
    },
];
