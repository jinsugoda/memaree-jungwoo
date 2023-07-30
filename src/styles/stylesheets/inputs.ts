//import * as Typography from "./typography";
import * as Colors from "../theme/colors";
import * as Spacing from "./spacing";

export const baseInput = {
    height: Spacing.inputHeight,
    // fontSize: Typography.paragraphSize,
    // fontFamily: Typography.fontFamily,
    padding: Spacing.basePaddingSize,
    borderRadius: Spacing.baseBorderRadius,
};

export const textInput = {
    ...baseInput,
    borderWidth: Spacing.baseBorderWidth,
    borderColor: Colors.border,
    backgroundColor: Colors.inputBackground,
};

export const focused = {
    ...textInput,
    borderWidth: Spacing.focusedBorderWidth,
    borderColor: Colors.primary,
};

export const errored = {
    ...focused,
    borderColor: Colors.error,
};

const baseButton = {
    ...baseInput,
    ...Spacing.marginTop,
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
} as const; 

export const disabled = {
    opacity: 0.3,
};

export const primaryButton = {
    ...baseButton,
    backgroundColor: Colors.primary,
};

export const secondaryButton = {
    ...baseButton,
    backgroundColor: Colors.secondary,
};