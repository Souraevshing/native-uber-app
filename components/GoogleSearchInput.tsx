import { GoogleInputProps } from "@/types/types";
import { StyledText, StyledView } from ".";

/**
 * @description search rides among `list` of `rides`
 * @param icon - search icon
 * @param containerStyle - styles for container
 * @param handlePress - handle button press
 */
const GoogleSearchInput = ({
  icon,
  containerStyle,
  handlePress,
  textInputBackgroundColor,
  initialLocation,
}: GoogleInputProps) => {
  return (
    <StyledView
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl mb-5 ${containerStyle}`}
    >
      <StyledText>Search</StyledText>
    </StyledView>
  );
};

export default GoogleSearchInput;
