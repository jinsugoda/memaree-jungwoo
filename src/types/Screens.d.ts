import { CommentData, Lane, Post } from './DataModels';
import { Item, notificationItem } from './Item';

type LaunchStackParamList = {
    HomeScreen: undefined;
    LoginScreen: undefined;
    LoginSignupScreen: undefined;
};

type PasswordRecoveryParamList = {
    ForgotPasswordScreen: {
        username?: string;
    };
    ResetPasswordScreen: {
        username: string;
        code: string;
    };
};

type RegisterationStackParamList = {
    CreateAccountScreen: undefined;
    CreateAccountDetailsScreen: undefined;
    CreateAccountConfirmationScreen: {
        username: string;
    };
};

type PostCreationStackParamList = {
    TakePhotoScreen: {
        name: string;
        type: string;
    };
    NewPostScreen: undefined;
    PreviewScreen: {
        type: string;
        mediaUri: string;
        mediaType: string;
        onMediaVerified: (isAvatarReal: boolean) => void;
        imageBase64?: string;
        setIsAvatar?: any;
        setIsSharedToVision?: any;
    };
    EditingScreen: {
        type: string;
        mediaUri: string;
        mediaType: string;
        onMediaVerified: () => void;
    };
};

type PostScreens = {
    CommentScreen: {
        parentId: string;
        parentType: 'post' | 'comment';
        enableReplies: boolean;
        posterCaption: {
            posterId: string;
            name: string;
            caption: string;
            poster: string;
        };
    };
    ViewPostScreen: {
        post: Post;
    };
};

type SearchScreens = {
    SearchScreen: undefined;
};

type ProfileScreens = {
    SelfProfileScreen: undefined;
    OtherProfileScreen: {
        id: string;
    };
    EditUserInfoScreen: undefined;
};

type SocialScreens = {
    MessagingScreen: {
        lane: Lane;
    };
    MessagingRequestScreen: undefined;
    NotificationScreen: {
        data: notificationItem[];
    };
};

type SettingsScreens = {
    SettingsScreen: undefined;
    TermsOfUseScreen: undefined;
    PrivacyPolicyScreen: undefined;
};

type MainFeedScreen = {
    isFlipped: boolean;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
    openPostOptionsBottomSheet: (posterId: string, postId: string) => void;
    openSharePostBottomSheet: (postId: string) => void;
};

type FeedScreens = {
    FeedScreen: {
        openPostOptionsBottomSheet: (posterId: string, postId: string) => void;
        openSharePostBottomSheet: (postId: string) => void;
    };
    MemareeScreen: MainFeedScreen;
    VisionScreen: MainFeedScreen;
    CircleScreen: MainFeedScreen;
};

type CircleUserList = {
    CircleUserListScreen: {
        screenTitle: string;
        circleType: stirng;
    };
};
type CircleUserListRequest = {
    CircleUserListRequestScreen: undefined;
};

type GroupsScreen = {
    GroupsScreen: {
        screenTitle: string;
        groupId: string;
        owner: string;
        openPostOptionsBottomSheet: () => void;
        openSharePostBottomSheet: () => void;
    };
    GroupCardScreen: {
        openPostOptionsBottomSheet: () => void;
        openSharePostBottomSheet: () => void;
    };
};

type EditGroupScreen = {
    EditGroupScreen: {
        groupId: string;
        name: string;
    };
};

type CreateGroupScreen = {
    CreateGroupScreen: {
        img: string;
        name: string;
    };
};

type EditProfileScreen = {
    EditProfileScreen: undefined;
};

type GroupPreviewScreen = {
    GroupPreviewScreen: {
        postId: string;
        group: Group;
    };
};

/*
columnCount:MemareeColumnCount,
                    openPostOptionsBottomSheet:{"props.route.params?.openPostOptionsBottomSheet"},
                    filters:filters,
                    variables:{feedType: "memaree", isFlipped: false}
*/

type OnboardingScreen = {
    OnboardingScreen: undefined;
};

type Vision = {
    VisionScreen: undefined;
};

type PeopleScreen = {
    PeopleScreen: undefined;
};

type InviteUsersScreen = {
    InviteUsersScreen: undefined;
};

export type RootStackParamList = LaunchStackParamList &
    RegisterationStackParamList &
    PostCreationStackParamList &
    GroupsScreen &
    VisionScreen &
    CircleScreen &
    PostScreens &
    SearchScreens &
    ProfileScreens &
    SocialScreens &
    SettingsScreens &
    FeedScreens &
    GroupPreviewScreen &
    CircleUserList &
    CircleUserListRequest &
    EditGroupScreen &
    CreateGroupScreen &
    EditProfileScreen &
    OnboardingScreen &
    PeopleScreen &
    InviteUsersScreen &
    PasswordRecoveryParamList;
