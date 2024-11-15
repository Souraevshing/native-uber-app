import { useAuth, useUser } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import useLocationStore from "@/app/store";
import {
  StyledFlatList,
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
import { Ride } from "@/types/types";

/**
 * @description mock data for rides
 * @returns array of objects containing ride details
 */
const recentRides = [
  {
    ride_id: "1",
    origin_address: "Kathmandu, Nepal",
    destination_address: "Pokhara, Nepal",
    origin_latitude: "27.717245",
    origin_longitude: "85.323961",
    destination_latitude: "28.209583",
    destination_longitude: "83.985567",
    ride_time: 391,
    fare_price: "19500.00",
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-08-12 05:19:20.620007",
    driver: {
      driver_id: "2",
      first_name: "David",
      last_name: "Brown",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 5,
      rating: "4.60",
    },
  },
  {
    ride_id: "2",
    origin_address: "Jalkot, MH",
    destination_address: "Pune, Maharashtra, India",
    origin_latitude: "18.609116",
    origin_longitude: "77.165873",
    destination_latitude: "18.520430",
    destination_longitude: "73.856744",
    ride_time: 491,
    fare_price: "24500.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 06:12:17.683046",
    driver: {
      driver_id: "1",
      first_name: "James",
      last_name: "Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "3",
    origin_address: "Zagreb, Croatia",
    destination_address: "Rijeka, Croatia",
    origin_latitude: "45.815011",
    origin_longitude: "15.981919",
    destination_latitude: "45.327063",
    destination_longitude: "14.442176",
    ride_time: 124,
    fare_price: "6200.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 08:49:01.809053",
    driver: {
      driver_id: "1",
      first_name: "James",
      last_name: "Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "4",
    origin_address: "Okayama, Japan",
    destination_address: "Osaka, Japan",
    origin_latitude: "34.655531",
    origin_longitude: "133.919795",
    destination_latitude: "34.693725",
    destination_longitude: "135.502254",
    ride_time: 159,
    fare_price: "7900.00",
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-08-12 18:43:54.297838",
    driver: {
      driver_id: "3",
      first_name: "Michael",
      last_name: "Johnson",
      profile_image_url:
        "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url:
        "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: "4.70",
    },
  },
];

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
  }, []);

  return (
    <StyledSafeAreaView className="flex-1">
      <StyledFlatList
        data={recentRides}
        renderItem={({ item }: { item: Ride }) => <RideCard item={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 200,
          flexGrow: 1,
        }}
        className="px-5"
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
