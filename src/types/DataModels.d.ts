interface CUD {
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

interface UserContentEntity {
    _id: string;
    username: string;
    profilePicUrl: string;
}

interface User extends UserContentEntity {}

interface Interactions {
    isRemembered: boolean;
    replyPreviews: ShortComment[];
}

interface MediaContent {
    base64Image: string;
    base64Image_thumbnail: string;
    imageUrls: string[];
    caption?: string;
    title?: string;
}

interface CaptionContent {
    imageUrls?: string[];
    caption: string;
    title: string;
}

export type Message = {
    _id: string;
    laneId: string;
    user: UserContentEntity;
    content: ImageContent | CaptionContent;
    metaData: CUD;
    lastReadMsgsByUser: {
        [userId: string]: {
            lastReadMessageId: string;
            dateLastRead: Date;
        };
    };
};

export type Group = {
    _id: string;
    groupImage: string;
    name: string;
    posts: Post[];
    users: User[];
    owner: User;
    lastActivityAt: Date;
    metaData: {
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    };
    signedGroupImageUrl?: string;
    userCount?: number;
    readOnly?: boolean;
};

interface Comment {
    _id: string;
    user: UserContentEntity;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export interface CommentData extends Comment {
    content: ImageContent | CaptionContent;
    reactions: string[];
    subComments: CommentData[];
}

export interface ShortComment extends Comment {
    content: CaptionContent;
}

export type Comment = CommentData;

export declare interface Post {
    _id: string;
    // metadata: metadata;
    user: UserContentEntity;
    interactions: Interactions;
    content: MediaContent;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    comments: [Comment];
    numberOfComments: number;
    isSharedToVision: boolean;
    base64Image: string;
    base64Image_thumbnail: string;
    signedUrl: string;
    originalPost: Post;
    group: Group;
    // tags: string[];
}

export interface Request {
    _id: string;
    requestType: string;
    user: UserContentEntity;
    recipient: UserContentEntity;
    accepted: boolean | null;
    content: {
        caption: string;
    };
    metaData: CUD;
}

interface UserWithLatestPost extends UserContentEntity {
    latestPostMediaUrl: string;
}

export interface CircleGroup {
    _id: string;
    circleGroupName: string;
    metaData: CUD;
    users: UserWithLatestPost[];
}

export type SharedLane = {
    _id: string;
    name: string;
    users: [];
    posts: [];
    metaData: CUD;
};
