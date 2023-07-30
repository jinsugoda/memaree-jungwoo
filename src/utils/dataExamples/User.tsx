const BIO = "🍒 CS Major Philosophy Minor at University of Alberta | Aspiring entrepreneur “Jack of all trades, a master of one”";

export const UserCreator1 = {
    _id: '1',
    username: "mani_m",
    profilePicUrl: 'https://randomuser.me/api/portraits/women/53.jpg'
}

export const UserCreator2 = {
    _id: '2',
    username: "tattoo_guy",
    profilePicUrl: 'https://randomuser.me/api/portraits/women/53.jpg'
}

export const UserCreator3 = {
    _id: '3',
    username: "_samantah",
    profilePicUrl: 'https://randomuser.me/api/portraits/women/53.jpg'
}

export const UserCreator4 = {
    _id: '4',
    username: "robert_60",
    profilePicUrl: 'https://randomuser.me/api/portraits/women/53.jpg'
}

export const UserCreator5 = {
    _id: '5',
    username: "flower_girl",
    profilePicUrl: 'https://randomuser.me/api/portraits/women/53.jpg'
}

export const UserCreators = [UserCreator1, UserCreator2, UserCreator3, UserCreator4, UserCreator5]

export const TEMP_USER_LIST_DATA = [UserCreator1, UserCreator2];

export const USERS_WITH_LATEST_POST = [
    {
        ...UserCreator1,
        latestPostMediaUrl:
            "https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg",
    },
    {
        ...UserCreator2,
        latestPostMediaUrl:
            "https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg",
    },
    {
        ...UserCreator3,
        latestPostMediaUrl:
            "https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg",
    },
]


// profile
export const TEMP_MOCK_PROFILE_DATA = {
    "0": {
        user: {
            username: "JSmith",
            fullname: "John Smith",
            bio: BIO,
            url: 'https://randomuser.me/api/portraits/women/53.jpg',
            stats: {
            remembers: 200,
            remembered: 78,
            circle: 58
            }
        },
        //
        isInCircle: false,
        isRemembering: false,
    },
    "1": {
        user: {
            username: "JSmith",
            fullname: "John Smith",
            bio: BIO,
            url: 'https://randomuser.me/api/portraits/women/54.jpg',
            stats: {
            remembers: 200,
            remembered: 78,
            circle: 58
            }
        },
        //
        isInCircle: true,
        isRemembering: true,
    },
    "2": {
        user: {
            username: "JSmith",
            fullname: "John Smith",
            bio: BIO,
            url: 'https://randomuser.me/api/portraits/women/55.jpg',
            stats: {
            remembers: 200,
            remembered: 78,
            circle: 58
            }
        },
        //
        isInCircle: false,
        isRemembering: true,
    },
    "3": {
        user: {
            username: "JSmith",
            fullname: "John Smith",
            bio: BIO,
            url: 'https://randomuser.me/api/portraits/women/57.jpg',
            stats: {
            remembers: 200,
            remembered: 78,
            circle: 58
            }
        },
        //
        isInCircle: true,
        isRemembering: false,
    }
}

export const PROFILE = "7";

export const TEMP_USER_IDS = [
    {
      id:"1",
      username: 'amanda_19kkdkdkdkdkdkdk',
      notification: true
    },
    {
      id:"2",
      username: '_samantah',
      notification: true
    },
    {
      id:"3",
      username: 'robert_60',
      notification: false
    },
    {
      id:"8",
      username: 'flower_girl',
      notification: false
    },
    {
      id:"10",
      username: 'peterpan',
      notification: false
    },
    {
      id:"60",
      username: 'amanda_19',
      notification: false
    },
    {
      id:"4",
      username: 'amanda_19',
      notification: false
    },
    {
      id:"11",
      username: 'amanda_19',
      notification: false
    },
    {
      id:"23",
      username: 'amanda_19',
      notification: false
    },
];

export const PROFILE_EDIT_TEMP_DATA = {
    username: "JSmith",
    email: "johnsmith@email.com",
    phone: "777 333 4444",
    bio: BIO,
}


// getProfilePicForCurrentUser()
// fetchProfilePic()

// avatar bucket...
// avatar field on user: s3Key...


/*
// hectors lane thing? idk 
export const TEMP_USERS = [
    {
      _id: "1",
      avatarImgSrc: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
      latestPostImgSrc:
        "https://i.pinimg.com/originals/c2/3a/c7/c23ac787293448f3dec73de118e9ca79.jpg",
    },
*/