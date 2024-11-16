import { router } from "expo-router";

import { StyledText, StyledView } from "@/components";
import Button from "@/components/Button";
import GoogleSearchInput from "@/components/GoogleSearchInput";
import RidesLayout from "@/components/RidesLayout";
import { icons } from "@/constants/swipe-menu";
import { useLocationStore } from "@/store";

/**
 * @description search `places` to go `destination`
 * @returns source location and destination location screen to select place to go
 */
const FindRides = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RidesLayout snapPoints={["85%"]} title="Find rides">
      {/* source section */}
      <StyledView className="my-5">
        <StyledText className="text-lg font-JakartaExtraBold mb-3 text-gray-800">
          Source
        </StyledText>
        <GoogleSearchInput
          icon={icons.target}
          initialLocation={userAddress!}
          handlePress={(loc) => setUserLocation(loc)}
        />
      </StyledView>

      {/* destination section */}
      <StyledView className="my-3">
        <StyledText className="text-lg font-JakartaExtraBold mb-3 text-gray-800">
          Destination
        </StyledText>
        <GoogleSearchInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          handlePress={(loc) => setDestinationLocation(loc)}
        />
      </StyledView>

      {/* Search rides available between source and destination */}
      <Button
        btnText={"Search"}
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-5"
      />
    </RidesLayout>
  );
};

export default FindRides;
