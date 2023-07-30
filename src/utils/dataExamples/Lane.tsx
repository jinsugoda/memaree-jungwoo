import { TEMP_MESSAGES } from "./Message";
import { UserCreator1, UserCreator2, UserCreator3, UserCreator4, UserCreator5 } from "./User";
import { generateRandomProfilePic } from "./helperFuncs";

const TEMP_METADATA = {
    createdAt: new Date(1674315432000),
    updatedAt: null,
    deletedAt: null
}

export const TEMP_LANE_USER_REQUEST_LIST_DATA = [
    {
        requestId: 'LRQ1',
        requestType: 'Lane',
        user: {
            ...UserCreator1,
        },
        recipient: {
            ...UserCreator2
        },
        accepted: null,
        content: {
            caption: "Join Us"
        },
        metaData: TEMP_METADATA
    },
    {
        requestId: 'LRQ2',
        requestType: 'Lane',
        user: {
            ...UserCreator3
        },
        recipient: {
            ...UserCreator4
        },
        accepted: null,
        content: {
            caption: "Come here!"
        },
        metaData: TEMP_METADATA
    },
    {
        requestId: 'LRQ3',
        requestType: 'Lane',
        user: {
            ...UserCreator5
        },
        recipient: {
            ...UserCreator4
        },
        accepted: null,
        content: {
            caption: "Welcome!"
        },
        metaData: TEMP_METADATA
    },
    {
        requestId: 'LRQ4',
        requestType: 'Lane',
        user: {
            ...UserCreator5
        },
        recipient: {
            ...UserCreator4
        },
        accepted: null,
        content: {
            caption: "Be Chill"
        },
        metaData: TEMP_METADATA
    }
]
export const TEMP_LANE = {
    laneId: 'LANEID0',
    laneName: null,
    users: new Set(['0', "1"]),
    messages: TEMP_MESSAGES,
    lastReadMsgsByUser: {
        "1": {
            lastReadMessageId: "MSG0",
            dateLastRead: new Date("2022-03-23T15:30:00Z")
        },
    },
    createdAt: new Date(1674315432000),
    updatedAt: null,
    deletedAt: null,
}

export const TEMP_MESSAGES_FOR_TEMP_LANE_GROUP = [
    {
        messageId: "MSG0",
        laneId: 'LANEID1',
        content: {
            caption: 'I misssssssssssss you',
            urls: []
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
        laneId: 'LANEID1',
        content: {
            caption: 'I misssssssssssss you',
            urls: []
        },
        user: {
            userId: "0",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(1674325434000),
        updatedAt: null,
        deletedAt: null,
    },
    {
        messageId: "MSG2",
        laneId: 'LANEID1',
        content: {
            caption: 'Hi guys',
            urls: []
        },
        user: {
            userId: "2",
            username: "@nameofthree",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(1674415434000),
        updatedAt: null,
        deletedAt: null,
    },
]


export const TEMP_LANE_GROUP = {
    laneId: 'LANEID1',
    laneName: "Design Team",
    users: new Set(['0', "1", "2"]),
    messages: TEMP_MESSAGES,
    lastReadMsgsByUser: {
        "1": {
            lastReadMessageId: "MSG0",
            dateLastRead: new Date("2022-03-23T15:30:00Z")
        },
        "2": {
            lastReadMessageId: "MSG1",
            dateLastRead: new Date("2022-03-23T16:15:00Z")
        }
    },
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null
}


export const SCENE_LIST = [
    {
        userId:'1',
        sceneId:'1',
        sourceUrl: 'https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg',
        preview:'https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg',
        type: 'image',
        length: 8,            
        viewCount: 2000,
        expiryTime: new Date(1684314516000),
    },
    {
        userId:'1',
        sceneId:'2',
        sourceUrl: 'https://www.thoughtco.com/thmb/O__EjyNxlN7O_tlfSfMPcYD8AFc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lotus-flower-828457262-5c6334b646e0fb0001dcd75a.jpg',
        preview:'https://www.thoughtco.com/thmb/O__EjyNxlN7O_tlfSfMPcYD8AFc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lotus-flower-828457262-5c6334b646e0fb0001dcd75a.jpg',
        type: 'image',
        length: 5,            
        viewCount: 2000,
        expiryTime: new Date(1684314516000),
    },
    {
        userId:'1',
        sceneId:'3',
        sourceUrl: 'https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg',
        preview:'https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg',
        type: 'image',
        length: 18,            
        viewCount: 2000,
        expiryTime: new Date(1684314516000),
    },
    {
        userId:'1',
        sceneId:'4',
        sourceUrl: 'https://www.thoughtco.com/thmb/O__EjyNxlN7O_tlfSfMPcYD8AFc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lotus-flower-828457262-5c6334b646e0fb0001dcd75a.jpg',
        preview:'https://www.thoughtco.com/thmb/O__EjyNxlN7O_tlfSfMPcYD8AFc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lotus-flower-828457262-5c6334b646e0fb0001dcd75a.jpg',
        type: 'image',
        length: 5,            
        viewCount: 2000,
        expiryTime: new Date(1684314516000),
    },
    {
        userId:'1',
        sceneId:'5',
        sourceUrl: 'https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg',
        preview:'https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg',
        type: 'image',
        length: 18,            
        viewCount: 2000,
        expiryTime: new Date(1684314516000),
    },
];

