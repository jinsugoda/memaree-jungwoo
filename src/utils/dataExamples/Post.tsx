import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { generateRandomProfilePic } from "./helperFuncs";

// temp posts
export const RANDOM_POSTS = [
    {
        postId: "pst1",
        isLiked: false,
        likeCount: 0,
        content: {
          urls: ["https://picsum.photos/1000/1000"],
          caption: "Enjoying a beautiful day out with the family!🌳🌻👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [
            {
                commentId: generateUniqueID(),
                isLiked: false,
                content: {
                    caption: "Looks like a fun day out!"
                },
                user: {
                    userId: generateUniqueID(),
                    username: "JohnDoe",
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            },
            {
                commentId: generateUniqueID(),
                isLiked: false,
                user: {
                    userId: generateUniqueID(),
                    username: "JaneDoe",
                    profilePicUrl: generateRandomProfilePic()
                },
                content: {
                    caption: "Beautiful family photo! 😍"
                },
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            }
        ],
        tags: ["familytime", "naturelover"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    },
    {
        postId: "pst1",
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Just hanging out with the family today!🏡👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "weekendvibes"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Had a great time at the beach with the family! 🏖️👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [
            {
                commentId: generateUniqueID(),
                isLiked: false,
                content: {
                    caption: "Looks like you guys had a blast!"
                },
                user: {
                    userId: generateUniqueID(),
                    username: "JohnDoe",
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            },
            {
                commentId: generateUniqueID(),
                isLiked: false,
                content: {
                    caption: "Love the family photo! 😍"
                },
                user: {
                    userId: generateUniqueID(),
                    username: "JaneDoe",
                    profilePicUrl: generateRandomProfilePic()
                },
                
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            }
        ],
        tags: ["familytime", "beachday"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Cooking dinner with the family tonight! 🍴👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [
            {
                commentId: generateUniqueID(),
                isLiked: false,
                content: {
                    caption: "What are you guys cooking? Looks delicious! 😋"
                },
                user: {
                    userId: generateUniqueID(),
                    username: "JohnDoe",
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            }
        ],
        tags: ["familytime", "dinnertime"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Just a casual day at the park with the family! 🌳👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "parkday"],
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        }
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 45,
        content: {
            urls: ['https://placekitten.com/1000/1000'],
            caption: 'My new kitten is just too cute!'
        },
        replyPreviews: [
            {
                commentId: generateUniqueID(),
                isLiked: false,
                content: {
                    caption: 'Aww, so precious!',       
                },
                user: {
                    userId: generateUniqueID(),
                    username: 'catlover101',
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date('2023-03-20T10:30:00Z'),
                updatedAt: null,
                deletedAt: null,
            },
            {
                commentId: generateUniqueID(),
                isLiked: true,
                content: {
                    caption: 'I love the markings on their fur!',      
                },
                user: {
                    userId: generateUniqueID(),
                    username: 'kittenfanatic',
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date('2023-03-21T08:15:00Z'),
                updatedAt: null,
                deletedAt: null,
            }
        ],
        tags: ['kitten', 'cats', 'petsofinstagram'],
        user: {
            userId: generateUniqueID(),
            username: 'kittenmomma',
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date('2023-03-19T14:00:00Z'),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        content: {
            urls: ['https://placekitten.com/1000/1000'],
            caption: 'My kitten loves to play with string!'
        },
        isLiked: true,
        likeCount: 32,
        replyPreviews: [
            {
                commentId: generateUniqueID(),
                isLiked: true,
                content: {
                    caption: 'I have a cat who does the same thing!',
                },
                user: {
                    userId: generateUniqueID(),
                    username: 'catstringlover',
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date('2023-03-18T12:30:00Z'),
                updatedAt: null,
                deletedAt: null,
            },
            {
                commentId: generateUniqueID(),
                isLiked: false,
                content: {
                    caption: 'Looks like so much fun!',
                },
                
                user: {
                    userId: generateUniqueID(),
                    username: 'kittenplaytime',
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date('2023-03-17T16:45:00Z'),
                updatedAt: null,
                deletedAt: null,
            }
        ],
        tags: ['kitten', 'cats', 'petsofinstagram', 'playtime'],
        user: {
            userId: generateUniqueID(),
            username: 'crazycatlady',
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date('2023-03-16T09:00:00Z'),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Family movie night! 🍿👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "movienight"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Fun day at the beach with the family! 🏖️👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "beachday"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Sunday family brunch! 🥞👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "brunch"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "A walk in the park with the family! 🌳👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "naturewalk"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Movie night with the family! 🎥👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "movienight"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "A day at the zoo with the family! 🦒👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "zooday"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Baking cookies with the family! 🍪👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "bakingday"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Celebrating mom's birthday with the family! 🎂👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "birthday"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
        
    },
    {
        postId: generateUniqueID(),
        isLiked: false,
        likeCount: 0,
        content: {
            urls: ["https://picsum.photos/1000/1000"],
            caption: "Hiking with the family on a beautiful day! 🌲👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [],
        tags: ["familytime", "hiking"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    }   
]


/*
{
        postId: "pst1",
        isLiked: false,
        likeCount: 0,
        content: {
          urls: ["https://picsum.photos/1000/1000"],
          caption: "Enjoying a beautiful day out with the family!🌳🌻👨‍👩‍👧‍👦❤️"
        },
        replyPreviews: [
            {
                commentId: generateUniqueID(),
                isLiked: false,
                content: {
                    caption: "Looks like a fun day out!"
                },
                user: {
                    userId: generateUniqueID(),
                    username: "JohnDoe",
                    profilePicUrl: generateRandomProfilePic()
                },
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            },
            {
                commentId: generateUniqueID(),
                isLiked: false,
                user: {
                    userId: generateUniqueID(),
                    username: "JaneDoe",
                    profilePicUrl: generateRandomProfilePic()
                },
                content: {
                    caption: "Beautiful family photo! 😍"
                },
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            }
        ],
        tags: ["familytime", "naturelover"],
        user: {
            userId: generateUniqueID(),
            username: "TestUser",
            profilePicUrl: generateRandomProfilePic()
        },
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    },
*/
