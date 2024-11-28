import { useUser } from "@clerk/clerk-expo";
import { isLoading } from "expo-font";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StyledImage, StyledText, StyledView } from "@/components";
import RideCard from "@/components/RideCard";
import { images } from "@/constants/swipe-menu";
import { useFetch } from "@/hooks/useFetch";
import { Ride } from "@/types/types";

const Rides = () => {
  const { user } = useUser();
  const { data: recentRides } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView>
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
              <StyledText className="text-2xl font-JakartaBold">
                All rides
              </StyledText>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Rides;
