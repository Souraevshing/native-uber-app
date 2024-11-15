import { StyledImage, StyledView } from "@/components";
import { icons } from "@/constants/swipe-menu";
import { GoogleInputProps } from "@/types/types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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
      className={`flex flex-row items-center justify-center relative z-50 rounded-full mb-5 ${containerStyle}`}
      style={{
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 9999,
        shadowRadius: 5,
      }}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder={initialLocation ?? "Enter destination"}
        debounce={300}
        styles={{
          textInputContainer: {
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 16,
          },
          textInput: {
            fontSize: 18,
            fontWeight: "500",
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 10,
            color: "#1f2937", // Dark text for readability
          },
          listView: {
            borderRadius: 10,
            elevation: 4,
            marginHorizontal: 10,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry?.location.lat!,
            longitude: details?.geometry?.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: `${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
          language: "en-GB",
        }}
        renderLeftButton={() => (
          <StyledView
            style={{
              marginRight: 10,
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#4B5563", // Neutral gray for the icon container
              padding: 8,
              elevation: 5,
            }}
          >
            <StyledImage
              source={icon || icons.search}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: "#FFFFFF", // White icon for better visibility
              }}
            />
          </StyledView>
        )}
        textInputProps={{
          placeholderTextColor: "#9CA3AF", // Subtle gray for placeholder
          cursorColor: "#4B5563", // Neutral gray cursor
          selectionColor: "#3B82F6", // Accent color for text selection
          inputMode: "text",
          blurOnSubmit: true,
          clearButtonMode: "always",
        }}
      />
    </StyledView>
  );
};

export default GoogleSearchInput;
