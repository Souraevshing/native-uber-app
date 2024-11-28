import { useAuth, useUser } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components";
import GoogleSearchInput from "@/components/GoogleSearchInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants/swipe-menu";
import { useFetch } from "@/hooks/useFetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/types";

/**
 * @description home layout to render after `successful` login
 */
const Home = () => {
  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // logged in user details fetched from clerk
  const { user } = useUser();

  // get user current location and set destination from store
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  // fetch data based on user id by filtering
  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  // check if permission has been granted for location
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const { signOut } = useAuth();

  // sign out user on click
  const handleSignOut = async () => {
    await signOut();
    router.push("/(auth)/sign-in");
  };

  // handle searching from list of rides
  const handlePress = async (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-rides");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestLocation();
  }, [setUserLocation]);

  return (
    <StyledSafeAreaView className="flex-1">
      <FlatList
        data={recentRides}
        renderItem={({ item }: { item: Ride }) => <RideCard item={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 200,
          flexGrow: 1,
        }}
        style={{ padding: 20 }}
        // render when data prop is empty
        ListEmptyComponent={() => {
          return (
            <StyledView className="flex flex-1 flex-col items-center justify-center">
              {!isLoading ? (
                <StyledImage
                  source={images.noResult}
                  alt="no results"
                  resizeMode="cover"
                  className="w-44 h-44"
                />
              ) : (
                <ActivityIndicator size="small" color="#b8b8ff" />
              )}
            </StyledView>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <StyledView className="flex flex-row items-center justify-between my-5">
                <StyledText className="font-JakartaExtraBold text-xl capitalize">
                  Hi,{" "}
                  {user?.firstName ||
                    user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
                  🤩
                </StyledText>
                <StyledTouchableOpacity
                  onPress={handleSignOut}
                  className="justify-center items-center w-10 h-10 rounded-full"
                >
                  <FontAwesome
                    name="sign-out"
                    size={24}
                    role="button"
                    color="#e63946"
                  />
                </StyledTouchableOpacity>
              </StyledView>

              {/*destination to go to */}
              <GoogleSearchInput
                icon={icons.search}
                containerStyle="bg-white"
                handlePress={handlePress}
              />

              <>
                <StyledText className="text-lg font-JakartaBold mt-5 mb-3">
                  You're here
                </StyledText>
                <StyledView className="flex flex-row items-center bg-transparent h-[300px]">
                  {/* map showing the from and to distance */}
                  <Map />
                </StyledView>
              </>
            </>
          );
        }}
      />
    </StyledSafeAreaView>
  );
};

export default Home;
