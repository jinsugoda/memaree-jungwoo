import { ImageStyle, ViewStyle } from "react-native";

export const container: ViewStyle = {

  }

export const lastPostImage: ImageStyle = {
    borderRadius: 6,
  }

export const avatarContainer: ImageStyle = {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateY: 20 }, { translateX: -20 }],
  }