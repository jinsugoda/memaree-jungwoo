import { createContext, useContext } from 'react';

// Define the context shape
export interface FeedContextProps {
    isFlippedMemaree: boolean;
    setIsFlippedMemaree: React.Dispatch<React.SetStateAction<boolean>>;
    isFlippedCircle: boolean;
    setIsFlippedCircle: React.Dispatch<React.SetStateAction<boolean>>;
    isFlippedVision: boolean;
    setIsFlippedVision: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const FeedContext = createContext<FeedContextProps | undefined>(undefined);

// Custom hook to access the context
const useFeedContext = (): FeedContextProps => {
    const context = useContext(FeedContext);
    if (!context) {
        throw new Error('useFeedContext must be used within a FeedContextProvider');
    }
    return context;
};

export { FeedContext, useFeedContext };
