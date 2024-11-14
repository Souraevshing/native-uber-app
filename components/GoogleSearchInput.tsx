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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        height: "10%",
      }}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Enter destination"
        debounce={300}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
            paddingVertical: 8,
            paddingHorizontal: 15,
            backgroundColor: textInputBackgroundColor || "white",
            width: "100%",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "500",
            borderRadius: 9999,
            paddingVertical: 10,
            paddingHorizontal: 10,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            borderRadius: 9999,
            zIndex: 99,
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
            className="justify-center items-center bg-blue-500 mr-2"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "blue",
              padding: 8,
            }}
          >
            <StyledImage
              source={icon || icons.search}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: "#e9f5db",
              }}
            />
          </StyledView>
        )}
        textInputProps={{
          placeholder: initialLocation && "Enter destination",
          placeholderTextColor: "gray",
          cursorColor: "blue",
          selectionColor: "black",
          inputMode: "text",
          blurOnSubmit: true,
          clearButtonMode: "always",
        }}
      />
    </StyledView>
  );
};

export default GoogleSearchInput;
