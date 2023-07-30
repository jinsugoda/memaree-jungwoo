import { UserCreator1, UserCreator2, UserCreator3, UserCreator4, UserCreator5 } from 'utils/dataExamples/User';

const TEMP_METADATA = {
    createdAt: new Date(1674315432000),
    updatedAt: null,
    deletedAt: null
}

export const TEMP_CIRCLE_USER_REQUEST_LIST_DATA = [
    {
        requestId: 'RQ1',
        requestType: 'circle',
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
        requestId: 'RQ2',
        requestType: 'circle',
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
        requestId: 'RQ3',
        requestType: 'circle',
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
        requestId: 'RQ4',
        requestType: 'circle',
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

export const TEMP_CIRCLE_GROUPS = [
    {
        circleGroupId: "1",
        circleGroupName: "Family",
        users: [
            {
                ...UserCreator1,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator2,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator3,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
        ],
        metaData: TEMP_METADATA
    },
    {
      circleGroupId: "2",
      circleGroupName: "Friends",
      users: [
            {
                ...UserCreator1,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator2,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator3,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
        ],
        metaData: TEMP_METADATA
    },
    {
      circleGroupId: "3",
      circleGroupName: "Work",
      users: [
            {
                ...UserCreator3,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator4,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator5,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
        ],
        metaData: TEMP_METADATA
    },
    {
        circleGroupId: "4",
        circleGroupName: "Hockey",
        users: [
            {
                ...UserCreator5,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator4,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
            {
                ...UserCreator2,
                latestPostMediaUrl:
                    "https://c8ullrzqlj.execute-api.us-east-1.amazonaws.com/default/fetchFetchS3ImagesForMemaree",
            },
        ],
        metaData: TEMP_METADATA
    },
];