import { generateRandomProfilePic } from "./helperFuncs"

export const TEMP_MESSAGES = [
    {
        messageId: "MSG0",
        laneId: 'LANEID0',
        content: {
            caption: 'I misssssssssssss you',
            imageUrls: []
        },
        user: {
            userId: "1",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(1674315432000),
        updatedAt: null,
        deletedAt: null,
    },
    {
        messageId: "MSG1",
        laneId: 'LANEID0',
        content: {
            caption: 'I misssssssssssss you toooooooooooo',
            imageUrls: []
        },
        user: {
            userId: "0",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(1674315434000),
        updatedAt: null,
        deletedAt: null,
    }
]
// CHAT DATA IS NOW THE SAME AS MESSAGE DATA
export const TEST_CHAT_DATA = [
    {
        messageId: 'CHATDATAMSG0',
        laneId: 'CHATDATAMLNID0',
        user: {
            userId: 'o0',
            username: "mani_m",
            profilePicUrl: "https://placekitten.com/400/400",
        },
        content: { caption: "Movie at 7pm later? What do you think? Please let me know asap. Tickets running out quick." },
        lastReadMsgsByUser: {
            'o6': {
                lastReadMessageId: 'CHATDATAMSG2',
                dateLastRead: new Date(1674314321000)
            }
        },
        metaData: {
            createdAt: new Date(1674314321000),
            updatedAt: null,
            deletedAt: null,
        }
    },
    {
        messageId: 'CHATDATAMSG0',
        laneId: 'CHATDATAMLNID0',
        user: {
            userId: 'o0',
            username: "mani_m",
            profilePicUrl: "https://placekitten.com/400/400",
        },
        content: { caption: "Movie at 7pm later? What do you think? Please let me know asap. Tickets running out quick." },
        lastReadMsgsByUser: {
            'o6': {
                lastReadMessageId: 'CHATDATAMSG2',
                dateLastRead: new Date(1674314321000)
            }
        },
        metaData: {
            createdAt: new Date(1674314321000),
            updatedAt: null,
            deletedAt: null,
        }
    }
]

