import { Platform } from "react-native";

let font;
if (Platform.OS === "ios") {
  font = "Helvetica";
} else {
  font = "Roboto";
}

export const fontFamily = font;

// Sizes
export const paragraphSize = 16;
