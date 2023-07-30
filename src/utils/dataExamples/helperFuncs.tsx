import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID"

export function getRandomList(list, numItems) {
    // Make a copy of the original list to avoid modifying it
    const copyList = [...list];
    
    // Create a new array to hold the random items
    const randomList = [];
    
    // Loop through the desired number of items
    for (let i = 0; i < numItems; i++) {
      // Choose a random index from the copyList
      const randomIndex = Math.floor(Math.random() * copyList.length);
      
      // Add the item at that index to the randomList
      randomList.push(copyList[randomIndex]);
      
      // Remove the item at that index from the copyList to avoid duplicates
      copyList.splice(randomIndex, 1);
    }
    
    // Return the new random list
    return randomList;
}

export function generateRandomProfilePic() {
    return `https://xsgames.co/randomusers/assets/avatars/male/${Math.floor(Math.random() * 10)}.jpg`
}
