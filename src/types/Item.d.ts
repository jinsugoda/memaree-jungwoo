declare interface textComment {
    name: string;
    text: string;
}

export declare interface Item {
    /** URL to image */
    userId;
    url: string[];
    name: string;
    id: string;
    liked: boolean;
    reminded: boolean;
    remembered: boolean;
    caption: textComment;
    replyPreviews: textComment[];
}

export declare interface NamedItem extends Item {
    name: string;
    postUrl: string;
}

export type notificationItem = {
    name: string;
    profilePic: string;
    action: string;
    postUrl: string;
    seen: boolean;
    postPreview: string;
    time: Date;
    id: string;
    handleDeleteNotification: (id: string) => void;
};
